<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

interface CashierOrderSftpWriterInterface
{
    /**
     * @param string $archiveFileName
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $archiveFileName, string $archiveRemoteFilePath): void;
}
