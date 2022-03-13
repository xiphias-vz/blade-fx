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
    public function addOrderToQueueAction(AddToQueueTransfer $addToQueueTransfer)
    {
        return $this->getFacade()
            ->addOrderToQueue($addToQueueTransfer);
    }

    public function getOrdersQueueAction(GetOrdersQueueTransfer $getOrdersQueueTransfer)
    {
        return $this->getFacade()
            ->getOrdersQueue($getOrdersQueueTransfer);
    }
}
