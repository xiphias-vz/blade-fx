<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Communication\Controller;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\PickupQueue\Business\PickupQueueBusinessFacadeInterface getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return mixed
     */
    public function addOrderToQueueAction(AddToQueueTransfer $addToQueueTransfer)
    {
        return $this->getFacade()
            ->addOrderToQueue($addToQueueTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return mixed
     */
    public function getOrdersQueueAction(GetOrdersQueueTransfer $getOrdersQueueTransfer)
    {
        return $this->getFacade()
            ->getOrdersQueue($getOrdersQueueTransfer);
    }
}
