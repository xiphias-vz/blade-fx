<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 */
class MoveToReadyForCollectionCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        $orderTransfer = $this->getFacade()
            ->getOrderByIdSalesOrder($orderEntity->getIdSalesOrder());

        if (!$this->isAllItemsReadyForCollection($orderItems, $orderTransfer)) {
            return [];
        }

        PropelExtension::execute("call pyzx_picking_collection_signal_set('" . $orderTransfer->getMerchantReference() . "');");

        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setStoreStatus(OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER);

        $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $orderEntity->getIdSalesOrder(),
            $orderUpdateRequestTransfer
        );

        return [];
    }

    /**
     * @param array $omsTriggeredOrderItems
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    protected function isAllItemsReadyForCollection(array $omsTriggeredOrderItems, OrderTransfer $orderTransfer): bool
    {
        $omsTriggeredOrderItemIds = [];

        foreach ($omsTriggeredOrderItems as $omsTriggeredOrderItem) {
            $omsTriggeredOrderItemIds[] = $omsTriggeredOrderItem->getIdSalesOrderItem();
        }

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if (in_array($itemTransfer->getIdSalesOrderItem(), $omsTriggeredOrderItemIds)) {
                continue;
            }

            if ($this->isItemReadyForCollection($itemTransfer)) {
                continue;
            }

            return false;
        }

        return true;
    }

    private $states = [];

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    private function getStateName(ItemTransfer $itemTransfer): string
    {
        if (!isset($this->states[$itemTransfer->getFkOmsOrderItemState()])) {
            $this->states[$itemTransfer->getFkOmsOrderItemState()] = $itemTransfer->getState()->getName();
        }

        return $this->states[$itemTransfer->getFkOmsOrderItemState()];
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return bool
     */
    protected function isItemReadyForCollection(ItemTransfer $itemTransfer): bool
    {
        $itemStateName = $this->getStateName($itemTransfer);

        if ($itemStateName === OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER
            || $itemStateName === OmsConfig::STATE_CANCELLED
        ) {
            return true;
        }

        return false;
    }
}
