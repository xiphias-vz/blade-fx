<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Mapper;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;

interface GetOrdersQueueResourceMapperInterface
{
    /**
     * @param int $storeReference
     *
     * @return \Generated\Shared\Transfer\GetOrdersQueueTransfer
     */
    public function mapGetOrdersQueueStoreReferenceToGetOrdersQueueTransfer(int $storeReference): GetOrdersQueueTransfer;
}
