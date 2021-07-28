<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Updater;

use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;

class OrderUpdater implements OrderUpdaterInterface
{
     /**
      * @var \Spryker\Zed\Oms\Business\OmsFacadeInterface
      */
    private $omsFacade;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private $salesFacade;

    /**
     * @param \Spryker\Zed\Oms\Business\OmsFacadeInterface $omsFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    public function __construct(OmsFacadeInterface $omsFacade, SalesFacadeInterface $salesFacade)
    {
        $this->omsFacade = $omsFacade;
        $this->salesFacade = $salesFacade;
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsPicked(array $idOrderItems): void
    {
        $this->triggerOmsEvent(
            $idOrderItems,
            OmsConfig::STORE_EVENT_CONFIRM_PICKING,
            []
        );
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsContainerSelected(array $idOrderItems): void
    {
        $this->triggerOmsEvent(
            $idOrderItems,
            OmsConfig::STORE_EVENT_CONFIRM_SELECTING_CONTAINERS,
            []
        );
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsNotPicked(array $idOrderItems): void
    {
        $this->triggerOmsEvent(
            $idOrderItems,
            OmsConfig::STORE_EVENT_CANCEL_NOT_IN_STOCK,
            []
        );
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCollectedByCustomer(array $idOrderItems, int $idUser): void
    {
        $data = [
            OmsConfig::EVENT_ID_USER => $idUser,
        ];

        $this->triggerOmsEvent(
            $idOrderItems,
            OmsConfig::STORE_EVENT_CONFIRM_COLLECTION,
            $data
        );
    }

    /**
     * @param int[] $orderItemIds
     * @param string $omsEvent
     * @param array $data
     *
     * @return void
     */
    protected function triggerOmsEvent(array $orderItemIds, string $omsEvent, array $data): void
    {
        $this->omsFacade->triggerEventForOrderItems($omsEvent, $orderItemIds, $data);
    }

    /**
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return void
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): void
    {
        $this->salesFacade->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCanceledByCustomer(array $idSalesOrderItems): void
    {
        $this->triggerOmsEvent(
            $idSalesOrderItems,
            OmsConfig::STORE_EVENT_CANCEL_COLLECTION_BY_CUSTOMER,
            []
        );
    }
}
