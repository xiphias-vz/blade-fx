<?php

namespace Pyz\Zed\Sales\Business\OrderChange;

use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Spryker\Zed\Calculation\Business\CalculationFacadeInterface;
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

        foreach($orderChangeRequestTransfer->getOrderItemChangeRequest() as $orderItemChangeRequest) {
            $this->updateOrderItem($orderItemChangeRequest);
            $this->storeOrderChange($orderItemChangeRequest);
        }

        $this->recalculateOrder($orderChangeRequestTransfer);

        return $this->salesQueryContainer->getConnection()->commit();
    }

    private function recalculateOrder(OrderChangeRequestTransfer $orderChangeRequestTransfer)
    {
        $orderTransfer = $this->orderHydrator->hydrateOrderTransferFromPersistenceByIdSalesOrder(
            $orderChangeRequestTransfer->getFkSalesOrder()
        );
        $orderTransfer = $this->calculationFacade->recalculateOrder($orderTransfer);
        $this->orderUpdater->update($orderTransfer, $orderChangeRequestTransfer->getFkSalesOrder());
    }

    private function updateOrderItem(OrderItemChangeRequestTransfer $orderItemChangeRequest)
    {
        $salesOrderItemEntity = $this->salesQueryContainer
            ->querySalesOrderItem()
            ->findOneByIdSalesOrderItem($orderItemChangeRequest->getIdSalesOrderItem());

        $salesOrderItemEntity->setQuantity($orderItemChangeRequest->getQuantity());
        $salesOrderItemEntity->setGrossPrice($orderItemChangeRequest->getPrice());
        $salesOrderItemEntity->setPrice($orderItemChangeRequest->getPrice());

        $salesOrderItemEntity->save();
    }

    private function storeOrderChange(OrderItemChangeRequestTransfer $orderItemChangeRequest)
    {
        // TODO
    }
}
