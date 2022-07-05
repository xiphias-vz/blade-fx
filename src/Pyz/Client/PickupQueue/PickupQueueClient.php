<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PickupQueue;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Pyz\Client\PickupQueue\Zed\PickupQueueStubInterface;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\PickupQueue\PickupQueueFactory getFactory()
 */
class PickupQueueClient extends AbstractClient implements PickupQueueClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer): AddToQueueTransfer
    {
        return $this->getZedStub()->addOrderToQueue($addToQueueTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return mixed
     */
    public function getOrdersQueued(GetOrdersQueueTransfer $getOrdersQueueTransfer)
    {
        return $this->getZedStub()->getOrdersQueue($getOrdersQueueTransfer);
    }

    /**
     * @return \Pyz\Client\PickupQueue\Zed\PickupQueueStubInterface
     */
    protected function getZedStub(): PickupQueueStubInterface
    {
        return $this->getFactory()->createZedStub();
    }
}
