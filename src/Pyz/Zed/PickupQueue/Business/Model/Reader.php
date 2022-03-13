<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Business\Model;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface;

class Reader implements ReaderInterface
{
    /**
     * @var \Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @param \Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface $queryContainer
     */
    public function __construct(PickupQueueQueryContainerInterface $queryContainer)
    {
        $this->queryContainer = $queryContainer;
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Generated\Shared\Transfer\GetOrdersQueueTransfer
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer): GetOrdersQueueTransfer
    {
        return $this->queryContainer->getOrdersQueue($getOrdersQueueTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer): AddToQueueTransfer
    {
        return $this->queryContainer->addOrderToQueue($addToQueueTransfer);
    }
}
