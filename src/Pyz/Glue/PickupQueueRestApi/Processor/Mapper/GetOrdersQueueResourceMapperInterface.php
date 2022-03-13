<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Mapper;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Generated\Shared\Transfer\RestGetOrdersQueueAttributesTransfer;

interface GetOrdersQueueResourceMapperInterface
{
    public function mapGetOrdersQueueDataToRestGetOrdersQueueAttributesTransfer(array $getOrdersQueueData): RestGetOrdersQueueAttributesTransfer;

    public function mapGetOrdersQueueStoreReferenceToRestGetOrdersQueueAttributesTransfer(int $storeReference): RestGetOrdersQueueAttributesTransfer;

    public function mapGetOrdersQueueStoreReferenceToGetOrdersQueueTransfer(int $storeReference): GetOrdersQueueTransfer;
}
