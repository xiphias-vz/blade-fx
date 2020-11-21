<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use DateTime;
use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\Map\SpyMerchantSalesOrderTableMap;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery;
use Orm\Zed\Oms\Persistence\Map\SpyOmsOrderItemStateTableMap;
use Orm\Zed\Oms\Persistence\SpyOmsOrderItemState;
use Orm\Zed\PickingZone\Persistence\Map\PyzOrderPickingBlockTableMap;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepository as SprykerMerchantSalesOrderRepository;

/**
 * @method \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderPersistenceFactory getFactory()
 */
class MerchantSalesOrderRepository extends SprykerMerchantSalesOrderRepository implements MerchantSalesOrderRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function findMerchantSalesOrdersByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): MerchantSalesOrderCollectionTransfer {
        $merchantSalesOrderQuery = $this->getFactory()
            ->createMerchantSalesOrderQuery()
            ->joinWithMerchant();

        $merchantSalesOrderQuery = $this->applyOrderFilterCriteriaToSalesQuery($merchantSalesOrderQuery, $orderFilterCriteriaTransfer);

        $merchantSalesOrderEntities = $merchantSalesOrderQuery->find();

        return $this->getFactory()->createMerchantSalesOrderMapper()
            ->mapMerchantSalesOrderEntitiesToCollectionTransfer($merchantSalesOrderEntities);
    }

    /**
     * @inheritDoc
     */
    public function getSalesOrderItemDataByPickingDateAndPickingZone(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): array {
        $merchantSalesOrderQuery = $this->getFactory()
            ->createMerchantSalesOrderQuery();

        $minDeliveryDateTime = (new DateTime($orderFilterCriteriaTransfer->getDeliveryDate()))
            ->setTime(0, 0);
        $maxDeliveryDateTime = (clone $minDeliveryDateTime)
            ->setTime(23, 59);

        return $merchantSalesOrderQuery->select([
                SpySalesOrderItemTableMap::COL_SKU,
                SpySalesOrderItemTableMap::COL_NAME,
                SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE,
            ])
            ->withColumn(sprintf('SUM(%s)', SpySalesOrderItemTableMap::COL_QUANTITY), 'quantity')
            ->useOrderQuery()
                ->joinSpySalesShipment()
                ->useItemQuery()
                    ->addJoin(
                        SpySalesOrderItemTableMap::COL_PICK_ZONE,
                        PyzPickingZoneTableMap::COL_NAME,
                        Criteria::INNER_JOIN
                    )
                ->endUse()
            ->endUse()
            ->filterByRequestedDeliveryDate_Between(
                [
                    'min' => $minDeliveryDateTime,
                    'max' => $maxDeliveryDateTime,
                ]
            )
            ->addAnd(PyzPickingZoneTableMap::COL_ID_PICKING_ZONE, $orderFilterCriteriaTransfer->getIdPickingZone())
            ->groupBy(['spy_sales_shipment.requested_delivery_date', 'spy_sales_order_item.sku'])
            ->orderBy('spy_sales_shipment.requested_delivery_date')
            ->find()
            ->getArrayCopy();
    }

    /**
     * @param \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery $merchantSalesOrderQuery
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
     *
     * @return \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery
     */
    private function applyOrderFilterCriteriaToSalesQuery(
        SpyMerchantSalesOrderQuery $merchantSalesOrderQuery,
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): SpyMerchantSalesOrderQuery {
        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::MERCHANT_REFERENCES
        )) {
            $merchantSalesOrderQuery
                ->useMerchantQuery()
                    ->filterByMerchantReference_In(
                        $orderFilterCriteriaTransfer->getMerchantReferences()
                    )
                ->endUse();
        }

        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::STORE_STATUSES
        )) {
            $merchantSalesOrderQuery
                ->filterByStoreStatus_In(
                    $orderFilterCriteriaTransfer->getStoreStatuses()
                );
        }

        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::ID_SALES_ORDERS
        )) {
            $merchantSalesOrderQuery->filterByFkSalesOrder_In(
                $orderFilterCriteriaTransfer->getIdSalesOrders()
            );
        }

        $isAssignedIdUsersPropertyModified = $orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::ASSIGNED_ID_USERS
        );
        if ($isAssignedIdUsersPropertyModified) {
            $filteredIdUsers = array_filter($orderFilterCriteriaTransfer->getAssignedIdUsers());

            $merchantSalesOrderQuery->filterByFkUser_In($filteredIdUsers);
        }

        if ($orderFilterCriteriaTransfer->getAssignedIdUserCanBeNull() === true) {
            if ($isAssignedIdUsersPropertyModified) {
                $merchantSalesOrderQuery->_or();
            }

            $merchantSalesOrderQuery->filterByFkUser(null);
        }

        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::DELIVERY_DATE
        )) {
            $minDeliveryDateTime = (new DateTime($orderFilterCriteriaTransfer->getDeliveryDate()))
                ->setTime(0, 0);
            $maxDeliveryDateTime = (clone $minDeliveryDateTime)
                ->setTime(23, 59);

            $merchantSalesOrderQuery->filterByRequestedDeliveryDate_Between(
                [
                    'min' => $minDeliveryDateTime,
                    'max' => $maxDeliveryDateTime,
                ]
            );
        }

        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::ORDER_COUNT_LIMIT
        )) {
            $merchantSalesOrderQuery->limit(
                $orderFilterCriteriaTransfer->getOrderCountLimit()
            );
        }

        if ($orderFilterCriteriaTransfer->isPropertyModified(OrderCriteriaFilterTransfer::ID_PICKING_ZONE)
            && $orderFilterCriteriaTransfer->isPropertyModified(OrderCriteriaFilterTransfer::ID_USER)
        ) {
            $merchantSalesOrderQuery
                ->useOrderQuery()
                    ->joinItem()
                    ->useItemQuery()
                        ->addJoin(
                            SpySalesOrderItemTableMap::COL_PICK_ZONE,
                            PyzPickingZoneTableMap::COL_NAME,
                            Criteria::INNER_JOIN
                        )
                        ->addJoin(
                            SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE,
                            SpyOmsOrderItemStateTableMap::COL_ID_OMS_ORDER_ITEM_STATE,
                            Criteria::INNER_JOIN
                        )
                    ->endUse()
                    ->leftJoinPyzOrderPickingBlock()
                    ->addJoinCondition(
                        'PyzOrderPickingBlock',
                        sprintf(
                            '%s = %s',
                            PyzPickingZoneTableMap::COL_ID_PICKING_ZONE,
                            PyzOrderPickingBlockTableMap::COL_FK_PICKING_ZONE
                        )
                    )
                ->endUse()
                ->where(sprintf(
                    '%s = %s AND (%s = %s OR %s IS NULL) AND %s = "%s"',
                    PyzPickingZoneTableMap::COL_ID_PICKING_ZONE,
                    $orderFilterCriteriaTransfer->getIdPickingZone(),
                    PyzOrderPickingBlockTableMap::COL_FK_USER,
                    $orderFilterCriteriaTransfer->getIdUser(),
                    PyzOrderPickingBlockTableMap::COL_FK_USER,
                    SpyOmsOrderItemStateTableMap::COL_NAME,
                    $orderFilterCriteriaTransfer->getStoreStatuses()[0]
                ))
                ->withColumn(PyzOrderPickingBlockTableMap::COL_FK_USER, OrderPickingBlockTransfer::ID_USER)
                ->groupBy(SpyMerchantSalesOrderTableMap::COL_ID_MERCHANT_SALES_ORDER);
        }

        $merchantSalesOrderQuery->orderByRequestedDeliveryDate();

        return $merchantSalesOrderQuery;
    }
}
