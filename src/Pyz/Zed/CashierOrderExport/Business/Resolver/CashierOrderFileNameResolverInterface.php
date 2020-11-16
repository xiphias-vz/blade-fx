<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Resolver;

interface CashierOrderFileNameResolverInterface
{
    /**
     * @param int $salesOrderId
     *
     * @return string
     */
    public function resolveCashierOrderExportFileName(int $salesOrderId): string;

    /**
     * @param int $salesOrderId
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFilePath(int $salesOrderId): string;

    /**
     * @param int $salesOrderId
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFileName(int $salesOrderId): string;

    /**
     * @param string $fileName
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveRemoteFilePath(string $fileName): string;
}
