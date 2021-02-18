<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\SpySalesExpenseQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderCommentQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\SalesDataExport\Persistence\SalesDataExportPersistenceFactory getFactory()
 */
class SalesDataExportRepository extends AbstractRepository implements SalesDataExportRepositoryInterface
{
    public const FILTER_CRITERIA_KEY_STORE_NAME = 'store_name';
    public const FILTER_CRITERIA_KEY_ORDER_CREATED_AT = 'order_created_at';
    public const FILTER_CRITERIA_KEY_ORDER_UPDATED_AT = 'order_updated_at';
    public const FILTER_CRITERIA_PARAM_DATE_FROM = 'from';
    public const FILTER_CRITERIA_PARAM_DATE_TO = 'to';

    public const PROPEL_CRITERIA_BETWEEN_MIN = 'min';
    public const PROPEL_CRITERIA_BETWEEN_MAX = 'max';

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
            ->leftJoinBillingAddress()
            ->useBillingAddressQuery(null, Criteria::LEFT_JOIN)
                ->leftJoinCountry()
                ->leftJoinRegion()
            ->endUse()
            ->orderByIdSalesOrder()
            ->offset($offset)
            ->limit($limit);

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

        return $dataExportBatchTransfer->setData($data);
    }

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
            ->orderByFkSalesOrder()
            ->offset($offset)
            ->limit($limit);

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
            ->orderByFkSalesOrder()
            ->offset($offset)
            ->limit($limit);

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
     * @param array $filterCriteria
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $salesOrderQuery
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    protected function applyFilterCriteriaToSalesOrderQuery(array $filterCriteria, SpySalesOrderQuery $salesOrderQuery): SpySalesOrderQuery
    {
        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME])) {
            $salesOrderQuery->filterByStore_In($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME]);
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT])) {
            $salesOrderQuery->filterByCreatedAt_Between([
                static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
            ]);
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT])) {
            $salesOrderQuery->filterByUpdatedAt_Between([
                static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
            ]);
        }

        return $salesOrderQuery;
    }

    /**
     * @param array $filterCriteria
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery $salesOrderItemQuery
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    protected function applyFilterCriteriaToSalesOrderItemQuery(array $filterCriteria, SpySalesOrderItemQuery $salesOrderItemQuery): SpySalesOrderItemQuery
    {
        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME])) {
            $salesOrderItemQuery
                ->useOrderQuery()
                    ->filterByStore_In($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME])
                ->endUse();
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT])) {
            $salesOrderItemQuery->filterByCreatedAt_Between([
                static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
            ]);
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT])) {
            $salesOrderItemQuery->filterByUpdatedAt_Between([
                static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
            ]);
        }

        return $salesOrderItemQuery;
    }

    /**
     * @param array $filterCriteria
     * @param \Orm\Zed\Sales\Persistence\SpySalesExpenseQuery $salesExpenseQuery
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesExpenseQuery
     */
    protected function applyFilterCriteriaToSalesExpenseQuery(array $filterCriteria, SpySalesExpenseQuery $salesExpenseQuery): SpySalesExpenseQuery
    {
        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME])) {
            $salesExpenseQuery
                ->useOrderQuery()
                    ->filterByStore_In($filterCriteria[static::FILTER_CRITERIA_KEY_STORE_NAME])
                ->endUse();
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT])) {
            $salesExpenseQuery
                ->useOrderQuery()
                    ->filterByCreatedAt_Between([
                        static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                        static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_CREATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
                    ])
                ->endUse();
        }

        if (isset($filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT])) {
            $salesExpenseQuery
                ->useOrderQuery()
                    ->filterByUpdatedAt_Between([
                        static::PROPEL_CRITERIA_BETWEEN_MIN => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_FROM],
                        static::PROPEL_CRITERIA_BETWEEN_MAX => $filterCriteria[static::FILTER_CRITERIA_KEY_ORDER_UPDATED_AT][static::FILTER_CRITERIA_PARAM_DATE_TO],
                    ])
                ->endUse();
        }

        return $salesExpenseQuery;
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return array
     */
    protected function getSalesOrderSelectedColumns(DataExportConfigurationTransfer $dataExportConfigurationTransfer): array
    {
        $fieldMapping = $this->getFactory()
            ->createSalesOrderMapper()
            ->getFieldMapping();

        return array_intersect_key($fieldMapping, array_flip($dataExportConfigurationTransfer->getFields()));
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return array
     */
    public function getSalesOrderItemSelectedColumns(DataExportConfigurationTransfer $dataExportConfigurationTransfer): array
    {
        $fieldMapping = $this->getFactory()
            ->createSalesOrderItemMapper()
            ->getFieldMapping();

        return array_intersect_key($fieldMapping, array_flip($dataExportConfigurationTransfer->getFields()));
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return array
     */
    public function getCustomSalesOrderItemSelectedColumns(DataExportConfigurationTransfer $dataExportConfigurationTransfer): array
    {
        $fieldMapping = $this->getFactory()
            ->createCustomSalesOrderItemMapper()
            ->getFieldMapping();

        return array_intersect_key($fieldMapping, array_flip($dataExportConfigurationTransfer->getFields()));
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return array
     */
    public function getSalesExpenseSelectedColumns(DataExportConfigurationTransfer $dataExportConfigurationTransfer): array
    {
        $fieldMapping = $this->getFactory()
            ->createSalesExpenseMapper()
            ->getFieldMapping();

        return array_intersect_key($fieldMapping, array_flip($dataExportConfigurationTransfer->getFields()));
    }

    /**
     * @param int[] $salesOrderIds
     *
     * @return \Generated\Shared\Transfer\CommentTransfer[]
     */
    public function getCommentsByOrderId(array $salesOrderIds): array
    {
        $salesOrderCommentEntities = SpySalesOrderCommentQuery::create()
            ->filterByFkSalesOrder_In($salesOrderIds)
            ->find();

        if ($salesOrderCommentEntities->count() === 0) {
            return [];
        }

        return $this->getFactory()
            ->createSalesOrderCommentMapper()
            ->mapSalesOrderCommentEntitiesToCommentTransfersByIdSalesOrder($salesOrderCommentEntities, []);
    }

    /**
     * Specification:
     * - Compensates magic functionality of propel, so single-column select returns the same format as a multi-columns select
     *
     * @param array $rows
     * @param array $selectedColumns
     *
     * @return array
     */
    protected function formatSingleColumnData(array $rows, array $selectedColumns): array
    {
        $selectedSingleColumnKey = array_shift($selectedColumns);
        $formattedRows = [];
        foreach ($rows as $row) {
            $formattedRows[] = [$selectedSingleColumnKey => $row];
        }

        return $formattedRows;
    }

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
    public function getCustomOrderItemData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getCustomSalesOrderItemSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);
        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesOrderItemQuery = $this->getFactory()
            ->getCustomSalesOrderItemPropelQuery()
            ->withColumn('(select spy_customer.my_globus_card from spy_customer where customer_reference = spy_sales_order.customer_reference)', 'my_globus_card')
            ->joinOrder()
            ->withColumn('(select count(*) from spy_sales_order_item where fk_sales_order = spy_sales_order.id_sales_order)', 'itemsCount')
            ->withColumn('(select spy_sales_order_totals.order_expense_total from spy_sales_order_totals where fk_sales_order = spy_sales_order.id_sales_order)', 'order_totals_order_expense_total')
            ->withColumn("(select count(*) from spy_sales_order_item where fk_oms_order_item_state = (select id_oms_order_item_state from spy_oms_order_item_state where name like 'cancelled') and fk_sales_order = spy_sales_order.id_sales_order)", 'Delivered_ItemsCount')
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
            ->orderByFkSalesOrder()
            ->offset($offset)
            ->limit($limit);

        $salesOrderItemQuery = $this->applyFilterCriteriaToSalesOrderItemQuery(
            $dataExportConfigurationTransfer->getFilterCriteria(),
            $salesOrderItemQuery
        );

        $salesOrderItemQuery->setDistinct()->select($selectedColumns);

        $salesOrderItemData = $salesOrderItemQuery->find()->getArrayCopy();

        $count = count($salesOrderItemData);
        for ($i = 0; $i < $count; $i++) {
            if ($salesOrderItemData[$i]["SpySalesShipment.DeliveryTime"] == null) {
                $salesOrderItemData[$i]["SpySalesShipment.DeliveryTime"] = explode('_', $salesOrderItemData[$i]["SpySalesShipment.RequestedDeliveryDate"])[1];
                $salesOrderItemData[$i]["SpySalesShipment.RequestedDeliveryDate"] = explode('_', $salesOrderItemData[$i]["SpySalesShipment.RequestedDeliveryDate"])[0];
            }
            $salesOrderItemData[$i]["SpySalesOrderItem.CreatedAt"] = date('d-m-y H:i', strtotime($salesOrderItemData[$i]["SpySalesOrderItem.CreatedAt"]));
            $salesOrderItemData[$i]["Delivered_ItemsCount"] = $salesOrderItemData[$i]["itemsCount"] - $salesOrderItemData[$i]["Delivered_ItemsCount"];
        }

        if ($salesOrderItemData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $salesOrderItemData = $this->formatSingleColumnData($salesOrderItemData, $selectedColumns);
        }

        $data = $this->getFactory()
            ->createCustomSalesOrderItemMapper()
            ->mapSalesOrderItemDataByField($salesOrderItemData);

        return $dataExportBatchTransfer->setData($data);
    }
}
