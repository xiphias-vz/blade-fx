<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Business;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;

interface OrderContainerFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void;
}
