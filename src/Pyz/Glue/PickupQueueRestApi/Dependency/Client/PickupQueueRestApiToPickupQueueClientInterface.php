<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace  Pyz\Glue\PickupQueueRestApi\Dependency\Client;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;

interface PickupQueueRestApiToPickupQueueClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer): AddToQueueTransfer;

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Generated\Shared\Transfer\GetOrdersQueueTransfer
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer): GetOrdersQueueTransfer;
}
