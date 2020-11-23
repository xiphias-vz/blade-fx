<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business\Writer;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;

interface PickingSalesOrderWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function refreshPickingSalesOrderCollection(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void;

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer|null
     */
    public function bindContainerToShelf(PickingSalesOrderTransfer $pickingSalesOrderTransfer): ?PickingSalesOrderTransfer;
}
