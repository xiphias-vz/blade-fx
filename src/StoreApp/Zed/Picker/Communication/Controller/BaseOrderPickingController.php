<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 */
abstract class BaseOrderPickingController extends AbstractController
{
    protected const PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED = 'storeapp.picking.message.error.order-is-already-being-processed';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool|\Generated\Shared\Transfer\OrderTransfer|null
     */
    public function isValidRequest(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            [OmsConfig::STORE_STATE_READY_FOR_PICKING]
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return false;
        }

        if ($this->isOrderPickingStartedByAnotherUser($idSalesOrder, $userTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return false;
        }

        return true;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return bool
     */
    protected function isOrderPickingStartedByAnotherUser(int $idSalesOrder, UserTransfer $userTransfer): bool
    {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setIdSalesOrders([$idSalesOrder]);

        $merchantSalesOrderTransfers = $this->getFactory()->getMerchantSalesOrderFacade()
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders();

        if ($merchantSalesOrderTransfers->count() !== 1) {
            return true;
        }

        $assignedIdUser = $merchantSalesOrderTransfers[$idSalesOrder]->getFkUser();
        if ($assignedIdUser === null || $assignedIdUser === $userTransfer->getIdUser()) {
            return false;
        }

        return true;
    }
}
