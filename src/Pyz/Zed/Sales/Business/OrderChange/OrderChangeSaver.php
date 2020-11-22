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
    public function saveOrderChange(OrderChangeRequestTransfer $orderChangeRequestTransfer)
    {
        $this->salesQueryContainer->getConnection()->beginTransaction();

        foreach ($orderChangeRequestTransfer->getOrderItemChangeRequest() as $orderItemChangeRequest) {
            $salesOrderItemEntity = $this->salesQueryContainer
                ->querySalesOrderItem()
                ->findOneByIdSalesOrderItem($orderItemChangeRequest->getIdSalesOrderItem());

            $oldPrice = $salesOrderItemEntity->getGrossPrice();

            $this->updateOrderItem($salesOrderItemEntity, $orderItemChangeRequest);
            $this->storeOrderChange($oldPrice, $orderItemChangeRequest);
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
