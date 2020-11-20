<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business\Writer;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;

interface PickingSalesOrderWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function updatePickingSalesOrderOrder(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void;
}
