<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Creator;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;

interface OrderContainersCreatorInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void;
}
