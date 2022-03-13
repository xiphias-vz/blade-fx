<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PickupQueue;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;

interface PickupQueueClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return mixed
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer);

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return mixed
     */
    public function getOrdersQueued(GetOrdersQueueTransfer $getOrdersQueueTransfer);
}
