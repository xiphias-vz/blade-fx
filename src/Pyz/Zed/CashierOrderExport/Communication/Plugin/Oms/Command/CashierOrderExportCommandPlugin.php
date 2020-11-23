<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacadeInterface getFacade()
 * @method \Pyz\Zed\CashierOrderExport\Communication\CashierOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 */
class CashierOrderExportCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * {@inheritDoc}
     * - Exports orders to the file on appropriate for cashier format.
     *
     * @api
     *
     * @param array $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
        $orderTransfer = $this->getFactory()
            ->getSalesFacade()
            ->getOrderByIdSalesOrder($orderEntity->getIdSalesOrder());

        if (!$this->isAllItemsReadyForExport($orderItems, $orderTransfer)) {
            $this->updateOrder($orderTransfer->setIsCashierExportSuccess(true));

            return [];
        }

        $orderTransfer = $this->getFacade()->exportOrders($orderTransfer);
        $this->updateOrder($orderTransfer);

        return [];
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    protected function updateOrder(OrderTransfer $orderTransfer): void
    {
        $this->getFactory()
            ->getSalesFacade()
            ->updateOrder($orderTransfer, $orderTransfer->getIdSalesOrder());
    }

    /**
     * @param array $omsTriggeredOrderItems
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    protected function isAllItemsReadyForExport(array $omsTriggeredOrderItems, OrderTransfer $orderTransfer): bool
    {
        $omsTriggeredOrderItemIds = [];

        foreach ($omsTriggeredOrderItems as $omsTriggeredOrderItem) {
            $omsTriggeredOrderItemIds[] = $omsTriggeredOrderItem->getIdSalesOrderItem();
        }

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if (in_array($itemTransfer->getIdSalesOrderItem(), $omsTriggeredOrderItemIds)) {
                continue;
            }

            if ($this->isItemReadyForExport($itemTransfer)) {
                continue;
            }

            return false;
        }

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return bool
     */
    protected function isItemReadyForExport(ItemTransfer $itemTransfer): bool
    {
        $itemStateName = $itemTransfer->getState()->getName();

        if ($itemStateName === OmsConfig::STORE_STATE_PICKED
            || $itemStateName === OmsConfig::STATE_CANCELLED
            || $itemStateName === OmsConfig::STORE_STATE_CASHIER_ORDER_EXPORTING_FAIL
        ) {
            return true;
        }

        return false;
    }
}
