<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use PDO;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\Propel;
use Spryker\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper;
use Spryker\Zed\SalesDataExport\Persistence\SalesDataExportRepository as SpySalesDataExportRepository;

/**
 * @method \Spryker\Zed\SalesDataExport\Persistence\SalesDataExportPersistenceFactory getFactory()
 */
class SalesDataExportRepository extends SpySalesDataExportRepository
{
    /**
     * @module Country
     * @module Oms
     * @module Shipment
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function getOrderItemData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getSalesOrderItemSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);
        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesOrderItemQuery = $this->getFactory()
            ->getSalesOrderItemPropelQuery()
            ->joinOrder()
            ->joinState()
            ->leftJoinProcess()
            ->leftJoinSalesOrderItemBundle()
            ->leftJoinSpySalesShipment()
            ->useSpySalesShipmentQuery()
            ->leftJoinSpySalesOrderAddress()
            ->useSpySalesOrderAddressQuery()
            ->leftJoinCountry()
            ->leftJoinRegion()
            ->endUse()
            ->endUse()
            ->orderByFkSalesOrder();

        $salesOrderItemQuery = $this->applyFilterCriteriaToSalesOrderItemQuery(
            $dataExportConfigurationTransfer->getFilterCriteria(),
            $salesOrderItemQuery
        );

        $salesOrderItemQuery->select($selectedColumns);

        $salesOrderItemData = $salesOrderItemQuery->find()->getArrayCopy();

        if ($salesOrderItemData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $salesOrderItemData = $this->formatSingleColumnData($salesOrderItemData, $selectedColumns);
        }

        $data = $this->getFactory()
            ->createSalesOrderItemMapper()
            ->mapSalesOrderItemDataByField($salesOrderItemData);

        return $dataExportBatchTransfer->setData($data);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function getOrderExpenseData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getSalesExpenseSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);
        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesExpenseQuery = $this->getFactory()
            ->getSalesExpensePropelQuery()
            ->joinOrder()
            ->leftJoinSpySalesShipment()
            ->orderByFkSalesOrder();

        $salesExpenseQuery = $this->applyFilterCriteriaToSalesExpenseQuery(
            $dataExportConfigurationTransfer->getFilterCriteria(),
            $salesExpenseQuery
        );

        $salesExpenseQuery->select($selectedColumns);
        $orderExpenseData = $salesExpenseQuery->find()->toArray();

        if ($orderExpenseData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $orderExpenseData = $this->formatSingleColumnData($orderExpenseData, $selectedColumns);
        }

        $data = $this->getFactory()
            ->createSalesExpenseMapper()
            ->mapSalesExpenseDataByField($orderExpenseData);

        return $dataExportBatchTransfer->setData($data);
    }

    /**
     * @module Country
     * @module Locale
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function getOrderData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getSalesOrderSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);

        $hasComments = in_array(SalesOrderMapper::KEY_ORDER_COMMENTS, $dataExportConfigurationTransfer->getFields(), true);
        if ($hasComments) {
            $selectedFields[SalesOrderMapper::KEY_ORDER_COMMENTS] = SalesOrderMapper::KEY_ORDER_COMMENTS;
            $selectedColumns[SpySalesOrderTableMap::COL_ID_SALES_ORDER] = SpySalesOrderTableMap::COL_ID_SALES_ORDER;
        }

        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesOrderQuery = $this->getFactory()
            ->getSalesOrderPropelQuery()
            ->joinLocale()
            ->joinOrderTotal()
            ->leftJoinSpySalesShipment()
            ->leftJoinBillingAddress()
            ->useBillingAddressQuery(null, Criteria::LEFT_JOIN)
            ->leftJoinCountry()
            ->leftJoinRegion()
            ->endUse()
            ->orderByIdSalesOrder();

        $salesOrderQuery = $this->applyFilterCriteriaToSalesOrderQuery($dataExportConfigurationTransfer->getFilterCriteria(), $salesOrderQuery);
        $salesOrderQuery->select($selectedColumns);

        $salesOrderData = $salesOrderQuery->find()->getArrayCopy();

        if ($salesOrderData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $salesOrderData = $this->formatSingleColumnData($salesOrderData, $selectedColumns);
        }

        if ($hasComments) {
            $salesOrderIds = array_column($salesOrderData, SpySalesOrderTableMap::COL_ID_SALES_ORDER);
            $salesOrderCommentTransfers = $this->getCommentsByOrderId($salesOrderIds);

            foreach ($salesOrderIds as $salesOrderDataKey => $idSalesOrder) {
                $salesOrderData[$salesOrderDataKey][SalesOrderMapper::KEY_ORDER_COMMENTS] = $salesOrderCommentTransfers[$idSalesOrder] ?? [];
                unset($salesOrderData[$salesOrderDataKey][SpySalesOrderTableMap::COL_ID_SALES_ORDER]);
            }
        }

        $data = $this->getFactory()
            ->createSalesOrderMapper()
            ->mapSalesOrderDataByField($salesOrderData, $selectedFields);

        $dataFromSalesOrderSummary = $this->getDataBySalesOrderSummary();
        $data = $this->updateDataset($data, $dataFromSalesOrderSummary);
        $dataExportBatchTransfer = $this->updateFields($selectedFields, $dataExportBatchTransfer);

        return $dataExportBatchTransfer->setData($data);
    }

    /**
     * @param array $selectedFields
     * @param \Generated\Shared\Transfer\DataExportBatchTransfer $dataExportBatchTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function updateFields(array $selectedFields, DataExportBatchTransfer $dataExportBatchTransfer): DataExportBatchTransfer
    {
        $selectedFields['DeliveryDate'] = 'DeliveryDate';
        $selectedFields['ItemValueGross'] = 'ItemValueGross';
        $selectedFields['ItemValueNet'] = 'ItemValueNet';
        $selectedFields['ItemQuantity'] = 'ItemQuantity';
        $selectedFields['ItemsCount'] = 'ItemsCount';
        $selectedFields['external_customer_identifier'] = 'external_customer_identifier';
        $selectedFields['loyalty_number'] = 'loyalty_number';
        $selectedFields['TimeSlot'] = 'TimeSlot';
        $selectedFields['status'] = 'status';
        $selectedFields['Delivered_ItemValueGross'] = 'Delivered_ItemValueGross';
        $selectedFields['Delivered_ItemValueNet'] = 'Delivered_ItemValueNet';
        $selectedFields['Delivered_ItemsQuantity'] = 'Delivered_ItemsQuantity';
        $selectedFields['Delivered_ItemsCount'] = 'Delivered_ItemsCount';
        $selectedFields['ShippingValueGross'] = 'ShippingValueGross';

        return $dataExportBatchTransfer->setFields($selectedFields);
    }

    /**
     * @param array $salesOrderData
     * @param array $dataFromSalesOrderSummary
     *
     * @return array
     */
    public function updateDataset(array $salesOrderData, array $dataFromSalesOrderSummary): array
    {
        foreach ($salesOrderData as $salesOrderKey => $salesOrder) {
            if ($salesOrder['order_reference'] == $dataFromSalesOrderSummary[$salesOrderKey]['OrderNr']) {
                $salesOrderData[$salesOrderKey]['DeliveryDate'] = $dataFromSalesOrderSummary[$salesOrderKey]['DeliveryDate'];
                $salesOrderData[$salesOrderKey]['ItemValueGross'] = $dataFromSalesOrderSummary[$salesOrderKey]['ItemValueGross'];
                $salesOrderData[$salesOrderKey]['ItemValueNet'] = $dataFromSalesOrderSummary[$salesOrderKey]['ItemValueNet'];
                $salesOrderData[$salesOrderKey]['ItemQuantity'] = $dataFromSalesOrderSummary[$salesOrderKey]['ItemQuantity'];
                $salesOrderData[$salesOrderKey]['ItemsCount'] = $dataFromSalesOrderSummary[$salesOrderKey]['ItemsCount'];
                $salesOrderData[$salesOrderKey]['external_customer_identifier'] = $dataFromSalesOrderSummary[$salesOrderKey]['external_customer_identifier'];
                $salesOrderData[$salesOrderKey]['loyalty_number'] = $dataFromSalesOrderSummary[$salesOrderKey]['loyalty_number'];
                $salesOrderData[$salesOrderKey]['TimeSlot'] = $dataFromSalesOrderSummary[$salesOrderKey]['TimeSlot'];
                $salesOrderData[$salesOrderKey]['status'] = $dataFromSalesOrderSummary[$salesOrderKey]['status'];
                $salesOrderData[$salesOrderKey]['Delivered_ItemValueGross'] = $dataFromSalesOrderSummary[$salesOrderKey]['Delivered_ItemValueGross'];
                $salesOrderData[$salesOrderKey]['Delivered_ItemValueNet'] = $dataFromSalesOrderSummary[$salesOrderKey]['Delivered_ItemValueNet'];
                $salesOrderData[$salesOrderKey]['Delivered_ItemsQuantity'] = $dataFromSalesOrderSummary[$salesOrderKey]['Delivered_ItemsQuantity'];
                $salesOrderData[$salesOrderKey]['Delivered_ItemsCount'] = $dataFromSalesOrderSummary[$salesOrderKey]['Delivered_ItemsCount'];
                $salesOrderData[$salesOrderKey]['ShippingValueGross'] = $dataFromSalesOrderSummary[$salesOrderKey]['ShippingValueGross'];
            }
        }

        return $salesOrderData;
    }

    /**
     * @return array
     */
    public function getDataBySalesOrderSummary(): array
    {
        $qry = "select sso.order_reference as OrderNr
	, sso.store
	, date_format(CONVERT_TZ(sso.created_at, '+00:00', '+01:00'),  '%d.%m.%Y %T') as OrderDate
	, date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as DeliveryDate
    , sum(ssoi.gross_price) as ItemValueGross
    , round(sum(round(ssoi.gross_price / ((100 + str.rate)/100), 2)), 0) as ItemValueNet
    , sum(ssoi.quantity) as ItemQuantity
    , count(distinct ssoi.product_number) as ItemsCount
    , sc.id_customer as external_customer_identifier
    , sc.my_globus_card as loyalty_number
    , right(sss.requested_delivery_date, 11) as TimeSlot
    , max(sit.name) as status
    , case when sum(ssoi.gross_price) - sum(case when ifnull(ssoi.canceled_amount, 0) > 0 then ssoi.gross_price else 0 end) > 0 then sum(ssoi.gross_price) - sum(case when ifnull(ssoi.canceled_amount, 0) > 0 then ssoi.gross_price else 0 end) else 0 end as Delivered_ItemValueGross
    , round(sum(case when sit.name like '%cancelled%' then 0 else round(ssoi.gross_price / ((100 + str.rate)/100), 2) end), 0) as Delivered_ItemValueNet
    , sum(case when sit.name in ('cancellation process', 'cancelled', 'cancelled due to not in stock')  then 0 else
        	case when ssoi.new_weight is not null and sit.name not in ('ready for picking', 'ready for selecting shelves') then round(ssoi.new_weight / ssoi.weight_per_unit, 0) else 1 end
        	end) as Delivered_ItemsQuantity,
        count(distinct case when sit.name like '%cancelled%' then 0 else ssoi.product_number end) - sign(sum(case when sit.name like '%cancelled%' then 1 else 0 end)) as Delivered_ItemsCount
    , case when sso.cart_note in ('null', '\"null\"') then null else sso.cart_note end as comment
    , ssot.order_expense_total as ShippingValueGross
    from spy_sales_order sso
        inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
        inner join spy_product sp on sp.sku = ssoi.product_number
		inner join spy_product_abstract spa on spa.id_product_abstract = sp.fk_product_abstract
		inner join spy_tax_set sts on sts.id_tax_set = spa.fk_tax_set
		inner join spy_tax_set_tax stst on stst.fk_tax_set = sts.id_tax_set
		inner join spy_tax_rate str ON str.id_tax_rate = stst.fk_tax_rate
        left outer join spy_customer sc on sso.customer_reference = sc.customer_reference
        left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
        left outer join spy_sales_order_item_bundle ssoib on ssoi.fk_sales_order_item_bundle = ssoib.id_sales_order_item_bundle
        inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
        left outer join spy_sales_order_totals ssot on ssot.fk_sales_order = sso.id_sales_order
    where ssoi.created_at > '2021-01-01'
        or ssoi.updated_at > '2021-01-01'
    group by
        sso.order_reference, sso.store, sso.created_at,
        sss.requested_delivery_date, ssoib.gross_price, sso.customer_reference, sso.cart_note
        , ssot.canceled_total, ssot.order_expense_total
    ";

        $connection = Propel::getConnection();
        $statement = $connection->prepare($qry);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_NAMED);
    }
}
