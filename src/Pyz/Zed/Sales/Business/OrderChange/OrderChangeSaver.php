<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\OrderChange;

use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrderChange;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Sales\Business\Model\Order\OrderUpdaterInterface;
use Spryker\Zed\Sales\Business\Order\OrderHydratorInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToCalculationInterface;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface;

class OrderChangeSaver
{
    /**
     * @var \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface
     */
    protected $salesQueryContainer;

    /**
     * @var \Spryker\Zed\Sales\Business\Order\OrderHydratorInterface
     */
    protected $orderHydrator;

    /**
     * @var \Spryker\Zed\Sales\Business\Model\Order\OrderUpdaterInterface
     */
    protected $orderUpdater;

    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToCalculationInterface
     */
    protected $calculationFacade;

    /**
     * @param \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface $salesQueryContainer
     * @param \Spryker\Zed\Sales\Business\Order\OrderHydratorInterface $orderHydrator
     * @param \Spryker\Zed\Sales\Business\Model\Order\OrderUpdaterInterface $orderUpdater
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToCalculationInterface $calculationFacade
     */
    public function __construct(
        SalesQueryContainerInterface $salesQueryContainer,
        OrderHydratorInterface $orderHydrator,
        OrderUpdaterInterface $orderUpdater,
        SalesToCalculationInterface $calculationFacade
    ) {
        $this->salesQueryContainer = $salesQueryContainer;
        $this->orderHydrator = $orderHydrator;
        $this->orderUpdater = $orderUpdater;
        $this->calculationFacade = $calculationFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderChangeRequestTransfer $orderChangeRequestTransfer
     *
     * @return bool
     */
    public function saveOrderChange(OrderChangeRequestTransfer $orderChangeRequestTransfer): bool
    {
        if ($orderChangeRequestTransfer->getOrderItemChangeRequest()->count() === 0) {
            return false;
        }

        $this->salesQueryContainer->getConnection()->beginTransaction();

        $arrayIdSalesOrderItem = [];
        foreach ($orderChangeRequestTransfer->getOrderItemChangeRequest() as $orderItemChangeRequest) {
            $arrayIdSalesOrderItem[] = $orderItemChangeRequest->getIdSalesOrderItem();
        }

        $salesOrderItemEntities = $this->salesQueryContainer
            ->querySalesOrderItem()
            ->filterByIdSalesOrderItem_In($arrayIdSalesOrderItem)
            ->find();

        $length = count($salesOrderItemEntities);
        for ($i = 0; $i < $length; $i++) {
            $oldPrice = $salesOrderItemEntities[$i]->getGrossPrice();

            $this->updateOrderItem($salesOrderItemEntities[$i], $orderChangeRequestTransfer->getOrderItemChangeRequest()[$i]);
            $this->storeOrderChange($oldPrice, $orderChangeRequestTransfer->getOrderItemChangeRequest()[$i]);
        }

        $this->recalculateOrder($orderChangeRequestTransfer);

        return $this->salesQueryContainer->getConnection()->commit();
    }

    /**
     * @param \Generated\Shared\Transfer\OrderChangeRequestTransfer $orderChangeRequestTransfer
     *
     * @return void
     */
    private function recalculateOrder(OrderChangeRequestTransfer $orderChangeRequestTransfer)
    {
        $orderTransfer = $this->orderHydrator->hydrateOrderTransferFromPersistenceByIdSalesOrder(
            $orderChangeRequestTransfer->getFkSalesOrder()
        );
        $orderTransfer = $this->calculationFacade->recalculateOrder($orderTransfer);
        $this->orderUpdater->update($orderTransfer, $orderChangeRequestTransfer->getFkSalesOrder());
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $salesOrderItemEntity
     * @param \Generated\Shared\Transfer\OrderItemChangeRequestTransfer $orderItemChangeRequest
     *
     * @return void
     */
    private function updateOrderItem(
        SpySalesOrderItem $salesOrderItemEntity,
        OrderItemChangeRequestTransfer $orderItemChangeRequest
    ) {
        $salesOrderItemEntity->setPriceToPayAggregation($orderItemChangeRequest->getPrice());
        $salesOrderItemEntity->setPrice($orderItemChangeRequest->getPrice());
        $salesOrderItemEntity->setSubtotalAggregation($orderItemChangeRequest->getPrice());
        $salesOrderItemEntity->setGrossPrice($orderItemChangeRequest->getPrice());

        $salesOrderItemEntity->setNewWeight($orderItemChangeRequest->getNewWeight());

        $salesOrderItemEntity->save();
    }

    /**
     * @param int $oldPrice
     * @param \Generated\Shared\Transfer\OrderItemChangeRequestTransfer $orderItemChangeRequest
     *
     * @return void
     */
    private function storeOrderChange(int $oldPrice, OrderItemChangeRequestTransfer $orderItemChangeRequest)
    {
        $orderChangeEntity = new SpySalesOrderChange();
        $orderChangeEntity->setOldPrice($oldPrice);
        $orderChangeEntity->setNewPrice($orderItemChangeRequest->getPrice());
        $orderChangeEntity->setNewWeight($orderItemChangeRequest->getNewWeight());
        $orderChangeEntity->setFkSalesOrderItem($orderItemChangeRequest->getIdSalesOrderItem());

        $orderChangeEntity->save();
    }
}
