<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use DateTime;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Orm\Zed\Payone\Persistence\Map\SpyPaymentPayoneTableMap;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Orm\Zed\Stock\Persistence\SpyStockProduct;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Sales\Persistence\SalesRepository as SprykerSalesRepository;

/**
 * @method \Pyz\Zed\Sales\Persistence\SalesPersistenceFactory getFactory()
 */
class SalesRepository extends SprykerSalesRepository implements SalesRepositoryInterface
{
    public const COLUMN_TRANSACTION = 'transaction';
    protected const FORMAT_DELIVERY_DATE_COLUMN_FILTER = '%s%%';

    /**
     * @inheritDoc
     */
    public function findSalesShipmentNameByIdSalesShipment(int $idSalesShipment): string
    {
        return $this->getFactory()->createSalesShipmentQuery()
            ->filterByIdSalesShipment($idSalesShipment)
            ->select([SpySalesShipmentTableMap::COL_NAME])
            ->findOne();
    }

    /**
     * @param array $criteria
     *
     * @return array
     */
    public function getOrdersInfoByInvoiceDateTimeRange(array $criteria): array
    {
        return $this->getFactory()
            ->createSalesOrderQuery()
            ->filterByInvoiceCreatedAt_Between($criteria)
            ->leftJoinSpyPaymentPayone()
            ->withColumn(SpyPaymentPayoneTableMap::COL_TRANSACTION_ID, self::COLUMN_TRANSACTION)
            ->select([
                SpySalesOrderTableMap::COL_ID_SALES_ORDER,
                self::COLUMN_TRANSACTION,
            ])
            ->find()
            ->toArray(SpySalesOrderTableMap::COL_ID_SALES_ORDER);
    }

    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return int[]
     */
    public function getSaleOrderIdsByCustomerReferenceAndIdSalesOrder(string $customerReference, int $idSalesOrder): array
    {
        return $this->getFactory()->createSalesOrderItemQuery()
            ->select([SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM])
            ->useOrderQuery()
                ->filterByCustomerReference($customerReference)
            ->endUse()
            ->filterByFkSalesOrder($idSalesOrder)
            ->find()
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function findIdSalesOrdersByOrderFilterCriteria(OrderCriteriaFilterTransfer $orderFilterCriteriaTransport): array
    {
        $salesOrderQuery = $this->getFactory()->createSalesOrderQuery();
        $salesOrderQuery = $this->applyOrderFilterCriteriaToSalesQuery($salesOrderQuery, $orderFilterCriteriaTransport);

        return $salesOrderQuery
            ->select([
                SpySalesOrderTableMap::COL_ID_SALES_ORDER,
            ])
            ->find()
            ->toArray();
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $salesOrderQuery
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    private function applyOrderFilterCriteriaToSalesQuery(
        SpySalesOrderQuery $salesOrderQuery,
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): SpySalesOrderQuery {
        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::MERCHANT_REFERENCES
        )) {
            $salesOrderQuery->filterByMerchantReference_In(
                $orderFilterCriteriaTransport->getMerchantReferences()
            );
        }

        $isAssignedIdUsersPropertyModified = $orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ASSIGNED_ID_USERS
        );
        if ($isAssignedIdUsersPropertyModified) {
            $filteredIdUsers = array_filter($orderFilterCriteriaTransport->getAssignedIdUsers());

            $salesOrderQuery->filterByFkUser_In($filteredIdUsers);
        }

        if ($orderFilterCriteriaTransport->getAssignedIdUserCanBeNull() === true) {
            if ($isAssignedIdUsersPropertyModified) {
                $salesOrderQuery->_or();
            }

            $salesOrderQuery->filterByFkUser(null);
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::STORE_STATUSES
        )) {
            $salesOrderQuery->filterByStoreStatus_In(
                $orderFilterCriteriaTransport->getStoreStatuses()
            );
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ID_SALES_ORDERS
        )) {
            $salesOrderQuery->filterByIdSalesOrder_In(
                $orderFilterCriteriaTransport->getIdSalesOrders()
            );
        }

        $useSpySalesShipmentQuery = $salesOrderQuery->useSpySalesShipmentQuery();

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::REQUESTED_DELIVERY_DATE
        )) {
            $useSpySalesShipmentQuery->filterByRequestedDeliveryDate(
                $orderFilterCriteriaTransport->getRequestedDeliveryDate()
            );
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::SHIPMENT_NAME
        )) {
            $useSpySalesShipmentQuery->filterByName(
                $orderFilterCriteriaTransport->getShipmentName()
            );
        }

        if ($orderFilterCriteriaTransport->getExcludeCancelledOrders() === true) {
            $salesOrderQuery->useOrderTotalQuery()
                ->filterByGrandTotal(0, Criteria::GREATER_THAN)
            ->endUse();
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::DELIVERY_DATE
        )) {
            $deliveryDateTime = (new DateTime($orderFilterCriteriaTransport->getDeliveryDate()));

            $deliveryDateFilter = sprintf(
                static::FORMAT_DELIVERY_DATE_COLUMN_FILTER,
                $this->getDateStringFromDateTime($deliveryDateTime)
            );

            $useSpySalesShipmentQuery->filterByRequestedDeliveryDate_Like($deliveryDateFilter);
        }

        $useSpySalesShipmentQuery->endUse();

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ORDER_COUNT_LIMIT
        )) {
            $salesOrderQuery->limit(
                $orderFilterCriteriaTransport->getOrderCountLimit()
            );
        }

        return $salesOrderQuery;
    }

    /**
     * @inheritDoc
     */
    public function findIdOrderItemsByIdSalesOrders(array $idSalesOrders): array
    {
        $salesOrderItemQuery = $this->getFactory()->createSalesOrderItemQuery();

        return $salesOrderItemQuery
            ->filterByFkSalesOrder_In($idSalesOrders)
            ->select([
                SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM,
            ])
            ->find()
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndStates(int $idSalesOrder, array $states): array
    {
        $salesOrderItemQuery = $this->getFactory()
            ->createSalesOrderItemQuery()
            ->filterByFkSalesOrder($idSalesOrder)
            ->useStateQuery()
                ->filterByName_In($states)
            ->endUse()
            ->select([
                SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM,
            ])
            ->find();

        return $salesOrderItemQuery->toArray();
    }

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     * @param string[] $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndPickingZoneAndStates(
        int $idSalesOrder,
        int $idPickingZone,
        array $states
    ): array {
        $salesOrderItemQuery = $this->getFactory()
            ->createSalesOrderItemQuery()
            ->addJoin(
                SpySalesOrderItemTableMap::COL_PICK_ZONE,
                PyzPickingZoneTableMap::COL_NAME,
                Criteria::INNER_JOIN
            )
            ->filterByFkSalesOrder($idSalesOrder)
            ->addAnd(PyzPickingZoneTableMap::COL_ID_PICKING_ZONE, $idPickingZone)
            ->useStateQuery()
                ->filterByName_In($states)
            ->endUse()
            ->select([
                SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM,
            ])
            ->find();

        return $salesOrderItemQuery->toArray();
    }

    /**
     * @inheritDoc
     */
    public function findRequestedDeliveryDatesByIdSalesOrders(array $idSalesOrders): array
    {
        $spySalesShipments = $this->getFactory()
            ->createSalesShipmentQuery()
            ->filterByFkSalesOrder_In($idSalesOrders)
            ->select(
                [
                    SpySalesShipmentTableMap::COL_FK_SALES_ORDER,
                    SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE,
                ]
            )
            ->find();

        return $spySalesShipments->toKeyValue(
            SpySalesShipmentTableMap::COL_FK_SALES_ORDER,
            SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE
        );
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $itemEntityTransfer
     *
     * @return \Orm\Zed\Stock\Persistence\SpyStockProduct|null
     */
    public function findStockProduct(
        QuoteTransfer $quoteTransfer,
        SpySalesOrderItemEntityTransfer $itemEntityTransfer
    ): ?SpyStockProduct {
        $quoteTransfer->requireStore();
        $itemEntityTransfer->requireSku();

        $idStock = $this->getFactory()
            ->createStockQuery()
            ->findOneByName($quoteTransfer->getStore()->getName())
            ->getIdStock();

        $idProduct = $this->getFactory()
            ->createProductQuery()
            ->findOneBySku($itemEntityTransfer->getSku())
            ->getIdProduct();

        return $this->getFactory()
            ->createSpyStockProductQuery()
            ->filterByFkStock($idStock)
            ->filterByFkProduct($idProduct)
            ->findOne();
    }

    /**
     * @param \DateTime $deliveryDateTime
     *
     * @return string
     */
    private function getDateStringFromDateTime(DateTime $deliveryDateTime): string
    {
        $dateTimeString = $deliveryDateTime->format('c');

        return explode('T', $dateTimeString)[0];
    }
}
