<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Business;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\PickupQueue\Business\PickupQueueBusinessFactory getFactory()
 */
class PickupQueueFacade extends AbstractFacade implements PickupQueueBusinessFacadeInterface
{
    /**
     * @param string $storeReference
     *
     * @return mixed
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer)
    {
        return $this->getFactory()
            ->createReader()
            ->getOrdersQueue($getOrdersQueueTransfer);
    }

    /**
     * @return mixed
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer)
    {
        return $this->getFactory()
            ->createReader()
            ->addOrderToQueue($addToQueueTransfer);
    }
}
