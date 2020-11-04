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
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): MerchantSalesOrderCollectionTransfer {
        $merchantSalesOrderQuery = $this->getFactory()
            ->createMerchantSalesOrderQuery()
            ->joinWithMerchant();

        $merchantSalesOrderQuery = $this->applyOrderFilterCriteriaToSalesQuery($merchantSalesOrderQuery, $orderFilterCriteriaTransport);

        $merchantSalesOrderEntities = $merchantSalesOrderQuery->find();

        return $this->mapMerchantSalesOrderEntitiesToCollectionTransfer($merchantSalesOrderEntities);
    }

    /**
     * @param \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery $merchantSalesOrderQuery
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery
     */
    private function applyOrderFilterCriteriaToSalesQuery(
        SpyMerchantSalesOrderQuery $merchantSalesOrderQuery,
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): SpyMerchantSalesOrderQuery {
        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::MERCHANT_REFERENCES
        )) {
            $merchantSalesOrderQuery
                ->useMerchantQuery()
                    ->filterByMerchantReference_In(
                        $orderFilterCriteriaTransport->getMerchantReferences()
                    )
                ->endUse();
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::STORE_STATUSES
        )) {
            $merchantSalesOrderQuery
                ->filterByStoreStatus_In(
                    $orderFilterCriteriaTransport->getStoreStatuses()
                );
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ID_SALES_ORDERS
        )) {
            $merchantSalesOrderQuery->filterByFkSalesOrder_In(
                $orderFilterCriteriaTransport->getIdSalesOrders()
            );
        }

        $isAssignedIdUsersPropertyModified = $orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ASSIGNED_ID_USERS
        );
        if ($isAssignedIdUsersPropertyModified) {
            $filteredIdUsers = array_filter($orderFilterCriteriaTransport->getAssignedIdUsers());

            $merchantSalesOrderQuery->filterByFkUser_In($filteredIdUsers);
        }

        if ($orderFilterCriteriaTransport->getAssignedIdUserCanBeNull() === true) {
            if ($isAssignedIdUsersPropertyModified) {
                $merchantSalesOrderQuery->_or();
            }

            $merchantSalesOrderQuery->filterByFkUser(null);
        }

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::DELIVERY_DATE
        )) {
            $minDeliveryDateTime = (new DateTime($orderFilterCriteriaTransport->getDeliveryDate()))
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

        if ($orderFilterCriteriaTransport->isPropertyModified(
            OrderCriteriaFilterTransfer::ORDER_COUNT_LIMIT
        )) {
            $merchantSalesOrderQuery->limit(
                $orderFilterCriteriaTransport->getOrderCountLimit()
            );
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
