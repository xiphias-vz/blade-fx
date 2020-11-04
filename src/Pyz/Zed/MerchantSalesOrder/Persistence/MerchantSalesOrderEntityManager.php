<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\Map\SpyMerchantSalesOrderTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderEntityManager as SprykerMerchantSalesOrderEntityManager;

/**
 * @method \Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderPersistenceFactory getFactory()
 */
class MerchantSalesOrderEntityManager extends SprykerMerchantSalesOrderEntityManager implements MerchantSalesOrderEntityManagerInterface
{
    /**
     * @inheritDoc
     */
    public function updateOrderWithOrderUpdateRequest(
        int $idSalesOrder,
        OrderUpdateRequestTransfer $orderUpdateRequestTransfer
    ): bool {
        $criteria = $this->mapOrderUpdateRequestToCriteria($orderUpdateRequestTransfer);

        $success = $this->updateOrderWithCriteria($idSalesOrder, $criteria) === 1;

        return $success;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return \Propel\Runtime\ActiveQuery\Criteria
     */
    protected function mapOrderUpdateRequestToCriteria(OrderUpdateRequestTransfer $orderUpdateRequestTransfer): Criteria
    {
        $criteria = new Criteria();

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::STORE_STATUS
        )) {
            $criteria->add(
                SpyMerchantSalesOrderTableMap::COL_STORE_STATUS,
                $orderUpdateRequestTransfer->getStoreStatus(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::FK_USER
        )) {
            $criteria->add(
                SpyMerchantSalesOrderTableMap::COL_FK_USER,
                $orderUpdateRequestTransfer->getFkUser(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::PICKED_AT
        )) {
            $criteria->add(
                SpyMerchantSalesOrderTableMap::COL_PICKED_AT,
                $orderUpdateRequestTransfer->getPickedAt(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::COLLECTED_AT
        )) {
            $criteria->add(
                SpyMerchantSalesOrderTableMap::COL_COLLECTED_AT,
                $orderUpdateRequestTransfer->getCollectedAt(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::DELIVERED_AT
        )) {
            $criteria->add(
                SpyMerchantSalesOrderTableMap::COL_DELIVERED_AT,
                $orderUpdateRequestTransfer->getDeliveredAt(),
                Criteria::EQUAL
            );
        }

        return $criteria;
    }

    /**
     * @param int $idSalesOrder
     * @param \Propel\Runtime\ActiveQuery\Criteria $criteria
     *
     * @return int
     */
    protected function updateOrderWithCriteria(int $idSalesOrder, Criteria $criteria): int
    {
        return $this->getFactory()
            ->createMerchantSalesOrderQuery()
            ->filterByFkSalesOrder($idSalesOrder)
            ->update($criteria);
    }
}
