<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Business\Writer;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Generated\Shared\Transfer\OrderContainerTransfer;

interface OrderContainerWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void;

    /**
     * @param \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
     *
     * @return void
     */
    public function createOrderContainer(OrderContainerTransfer $orderContainerTransfer): void;
}
