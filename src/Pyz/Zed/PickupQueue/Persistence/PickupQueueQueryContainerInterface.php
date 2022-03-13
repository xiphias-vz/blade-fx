<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Persistence;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;

interface PickupQueueQueryContainerInterface
{
    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return mixed
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer): GetOrdersQueueTransfer;

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer): AddToQueueTransfer;
}
