<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Business\Writer;

interface SalesOrderSummaryExportSftpWriterInterface
{
    /**
     * @param string $content
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $archiveRemoteFilePath): void;
}
