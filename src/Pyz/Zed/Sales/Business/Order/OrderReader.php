<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrderQuery;
use Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface as PyzSalesQueryContainerInterface;
use Spryker\Zed\Sales\Business\Model\Order\OrderHydratorInterface;
use Spryker\Zed\Sales\Business\Order\OrderReader as SprykerOrderReader;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface;

class OrderReader extends SprykerOrderReader implements OrderReaderInterface
{
    /**
     * @var \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface
     */
    protected $pyzQueryContainer;

    /**
     * @param \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\Sales\Business\Model\Order\OrderHydratorInterface $orderHydrator
     * @param \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface $pyzQueryContainer
     */
    public function __construct(
        SalesQueryContainerInterface $queryContainer,
        OrderHydratorInterface $orderHydrator,
        PyzSalesQueryContainerInterface $pyzQueryContainer
    ) {
        parent::__construct($queryContainer, $orderHydrator);
        $this->pyzQueryContainer = $pyzQueryContainer;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrder(int $idSalesOrder): ?OrderTransfer
    {
        $orderEntity = $this->queryContainer
            ->querySalesOrderDetailsWithoutShippingAddress($idSalesOrder)
            ->find()
            ->getFirst();

        if ($orderEntity === null) {
            return null;
        }

        return $this->orderHydrator->hydrateOrderTransferFromPersistenceBySalesOrder($orderEntity);
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderWithPickingSalesOrdersByIdSalesOrder(int $idSalesOrder): ?OrderTransfer
    {
        $orderEntity = $this->pyzQueryContainer
            ->querySalesOrderDetailsWithPickingSalesOrder($idSalesOrder)
            ->find()
            ->getFirst();

        if ($orderEntity === null) {
            return null;
        }

        return $this->orderHydrator->hydrateOrderTransferFromPersistenceBySalesOrder($orderEntity);
    }

    /**
     * @param int $idSalesOrder
     * @param string $pickingZoneName
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrderAndPickingZone(int $idSalesOrder, string $pickingZoneName): ?OrderTransfer
    {
        $orderEntity = $this->queryContainer
            ->querySalesOrderDetailsWithoutShippingAddress($idSalesOrder)
            ->useItemQuery()
                ->filterByPickZone($pickingZoneName)
            ->endUse()
            ->find()
            ->getFirst();

        if (!$orderEntity) {
            return null;
        }

        return $this->orderHydrator->hydrateOrderTransferFromPersistenceBySalesOrder($orderEntity);
    }

    /**
     * @param int $idSalesOrder
     *
     * @return string[]
     */
    public function getDistinctOrderStates($idSalesOrder)
    {
        $orderItems = $this->queryContainer
            ->querySalesOrderItemsByIdSalesOrder($idSalesOrder)
            ->find();

        $states = [];
        foreach ($orderItems as $orderItem) {
            if ($orderItem->getItemPaused() != null && $orderItem->getItemPaused() != 0) {
                $states[$orderItem->getState()->getName() . ' paused'] = $orderItem->getState()->getName() . ' (paused)';
            } else {
                $states[$orderItem->getState()->getName()] = $orderItem->getState()->getName();
            }
        }

        return $states;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder
     */
    public function findMerchantSalesOrderByIdSalesOrder(int $idSalesOrder): SpyMerchantSalesOrder
    {
        $merchantSalesOrderQuery = SpyMerchantSalesOrderQuery::create();
        $merchantSalesOrder = $merchantSalesOrderQuery->findOneByFkSalesOrder($idSalesOrder);

        return $merchantSalesOrder;
    }
}
