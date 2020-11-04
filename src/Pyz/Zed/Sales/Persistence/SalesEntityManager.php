<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use DateTime;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Sales\Persistence\SalesEntityManager as SprykerSalesEntityManager;

/**
 * @method \Spryker\Zed\Sales\Persistence\SalesPersistenceFactory getFactory()
 */
class SalesEntityManager extends SprykerSalesEntityManager implements SalesEntityManagerInterface
{
    /**
     * @inheritDoc
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): bool
    {
        $criteria = new Criteria();
        $criteria->add(SpySalesOrderTableMap::COL_PICKING_BAGS_COUNT, $pickingBagsCount, Criteria::EQUAL);

        return $this->updateOrderWithCriteria($idSalesOrder, $criteria) === 1;
    }

    /**
     * @inheritDoc
     */
    public function updateOrderStoreStatus(int $idSalesOrder, string $status): bool
    {
        $criteria = new Criteria();
        $criteria->add(SpySalesOrderTableMap::COL_STORE_STATUS, $status, Criteria::EQUAL);

        return $this->updateOrderWithCriteria($idSalesOrder, $criteria) === 1;
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
            ->createSalesOrderQuery()
            ->filterByIdSalesOrder($idSalesOrder)
            ->update($criteria);
    }

    /**
     * @param int $idSalesOrder
     * @param string $invoiceReference
     * @param \DateTime $invoiceDateTime
     *
     * @return void
     */
    public function saveInvoiceReference(int $idSalesOrder, string $invoiceReference, DateTime $invoiceDateTime): void
    {
        $criteria = new Criteria();
        $criteria->add(SpySalesOrderTableMap::COL_INVOICE_REFERENCE, $invoiceReference)
            ->add(SpySalesOrderTableMap::COL_INVOICE_CREATED_AT, $invoiceDateTime);

        $this->getFactory()
            ->createSalesOrderQuery()
            ->filterByIdSalesOrder($idSalesOrder)
            ->update($criteria);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool
    {
        $criteria = $this->mapOrderUpdateRequestToCriteria($orderUpdateRequestTransfer);

        return $this->updateOrderWithCriteria($idSalesOrder, $criteria) === 1;
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
                SpySalesOrderTableMap::COL_STORE_STATUS,
                $orderUpdateRequestTransfer->getStoreStatus(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::FK_USER
        )) {
            $criteria->add(
                SpySalesOrderTableMap::COL_FK_USER,
                $orderUpdateRequestTransfer->getFkUser(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::PICKED_AT
        )) {
            $criteria->add(
                SpySalesOrderTableMap::COL_PICKED_AT,
                $orderUpdateRequestTransfer->getPickedAt(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::COLLECTED_AT
        )) {
            $criteria->add(
                SpySalesOrderTableMap::COL_COLLECTED_AT,
                $orderUpdateRequestTransfer->getCollectedAt(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::DELIVERED_AT
        )) {
            $criteria->add(
                SpySalesOrderTableMap::COL_DELIVERED_AT,
                $orderUpdateRequestTransfer->getDeliveredAt(),
                Criteria::EQUAL
            );
        }

        if ($orderUpdateRequestTransfer->isPropertyModified(
            OrderUpdateRequestTransfer::PICKING_BAGS_COUNT
        )) {
            $criteria->add(
                SpySalesOrderTableMap::COL_PICKING_BAGS_COUNT,
                $orderUpdateRequestTransfer->getPickingBagsCount(),
                Criteria::EQUAL
            );
        }

        return $criteria;
    }
}
