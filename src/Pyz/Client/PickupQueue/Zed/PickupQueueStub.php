<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PickupQueue\Zed;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;

class PickupQueueStub implements PickupQueueStubInterface
{
    /**
     * @var \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected $zedStub;

    /**
     * @param \Spryker\Client\ZedRequest\ZedRequestClientInterface $zedRequestClient
     */
    public function __construct(ZedRequestClientInterface $zedRequestClient)
    {
        $this->zedStub = $zedRequestClient;
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer)
    {
        return $this->zedStub->call('/pickup-queue/gateway/get-orders-queue', $getOrdersQueueTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer)
    {
        return $this->zedStub->call('/pickup-queue/gateway/add-order-to-queue', $addToQueueTransfer);
    }
}
