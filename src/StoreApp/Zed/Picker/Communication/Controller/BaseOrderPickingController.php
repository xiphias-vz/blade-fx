<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
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
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return bool
     */
    protected function isOrderPickingBlockAvailableForUser(
        int $idSalesOrder,
        UserTransfer $userTransfer,
        PickingZoneTransfer $pickingZoneTransfer
    ): bool {
        $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
            ->setIdSalesOrder($idSalesOrder)
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setIdUser($userTransfer->getIdUser());

        return $this->getFactory()->getPickingZoneFacade()
            ->isOrderPickingBlockAvailableForUser($orderPickingBlockTransfer);
    }
}
