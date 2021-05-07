<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Persistence;

use Generated\Shared\Transfer\FileSystemContentTransfer;

interface SalesOrderSummaryExportRepositoryInterface
{
    /**
     * @return \Generated\Shared\Transfer\FileSystemContentTransfer
     */
    public function getCustomOrderItemData(): FileSystemContentTransfer;

    /**
     * @return \Generated\Shared\Transfer\FileSystemContentTransfer
     */
    public function getProductsDeeplink(): FileSystemContentTransfer;
}
