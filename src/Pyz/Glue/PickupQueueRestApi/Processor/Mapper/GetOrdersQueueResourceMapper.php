<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Mapper;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Generated\Shared\Transfer\RestGetOrdersQueueAttributesTransfer;

class GetOrdersQueueResourceMapper implements GetOrdersQueueResourceMapperInterface
{
    public function mapGetOrdersQueueDataToRestGetOrdersQueueAttributesTransfer(array $getOrdersQueueData): RestGetOrdersQueueAttributesTransfer
    {
        return (new RestGetOrdersQueueAttributesTransfer())->fromArray($getOrdersQueueData, true);
    }

    public function mapGetOrdersQueueStoreReferenceToRestGetOrdersQueueAttributesTransfer(int $storeReference): RestGetOrdersQueueAttributesTransfer
    {
        $restGetOrdersQueueTransfer = new RestGetOrdersQueueAttributesTransfer();
        $restGetOrdersQueueTransfer->setMerchantFilialNumber($storeReference);

        return $restGetOrdersQueueTransfer;
    }

    public function mapGetOrdersQueueStoreReferenceToGetOrdersQueueTransfer(int $storeReference): GetOrdersQueueTransfer
    {
        $getOrdersQueueTransfer = new GetOrdersQueueTransfer();
        $getOrdersQueueTransfer->setMerchantFilialNumber($storeReference);

        return $getOrdersQueueTransfer;
    }
}
