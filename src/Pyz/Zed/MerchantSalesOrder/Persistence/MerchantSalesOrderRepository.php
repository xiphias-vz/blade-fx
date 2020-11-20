<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use DateTime;
use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepository as SprykerMerchantSalesOrderRepository;

/**
 * @method \Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderPersistenceFactory getFactory()
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

        return $this->mapMerchantSalesOrderEntitiesToCollectionTransfer($merchantSalesOrderEntities);
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

        if ($orderFilterCriteriaTransfer->isPropertyModified(
            OrderCriteriaFilterTransfer::PICKING_ZONE_NAME
        )) {
            $merchantSalesOrderQuery
                ->useOrderQuery()
                    ->joinItem()
                    ->useItemQuery()
                        ->filterByPickZone($orderFilterCriteriaTransfer->getPickingZoneName())
                    ->endUse()
                ->endUse();
        }

        $merchantSalesOrderQuery->orderByRequestedDeliveryDate();

        return $merchantSalesOrderQuery;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder[] $merchantSalesOrderEntities
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    private function mapMerchantSalesOrderEntitiesToCollectionTransfer(
        ObjectCollection $merchantSalesOrderEntities
    ): MerchantSalesOrderCollectionTransfer {
        $merchantSalesOrderCollectionTransfer = new MerchantSalesOrderCollectionTransfer();

        $merchantSalesOrderMapper = $this->getFactory()->createMerchantSalesOrderMapper();

        foreach ($merchantSalesOrderEntities as $merchantSalesOrderEntity) {
            $merchantSalesOrderTransfer = $merchantSalesOrderMapper->mapMerchantSalesOrderEntityToMerchantSalesOrderTransfer(
                $merchantSalesOrderEntity,
                new MerchantSalesOrderTransfer()
            );

            $merchantSalesOrderCollectionTransfer->getMerchantSalesOrders()->offsetSet(
                $merchantSalesOrderTransfer->getFkSalesOrder(),
                $merchantSalesOrderTransfer
            );
        }

        return $merchantSalesOrderCollectionTransfer;
    }
}
