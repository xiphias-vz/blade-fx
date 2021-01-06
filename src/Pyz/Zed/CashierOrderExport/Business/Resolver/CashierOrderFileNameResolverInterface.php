<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Resolver;

interface CashierOrderFileNameResolverInterface
{
    /**
     * @return string
     */
    public function resolveCashierOrderExportFileName(): string;

    /**
     * @param string $cashierOrderExportArchiveFileName
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFilePath(string $cashierOrderExportArchiveFileName): string;

    /**
     * @param int $idSalesOrder
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFileName(int $idSalesOrder): string;

    /**
     * @param string $fileName
     * @param string $store
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveRemoteFilePath(string $fileName, string $store): string;
}
