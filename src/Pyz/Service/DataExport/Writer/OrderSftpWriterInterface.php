<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport\Writer;

interface OrderSftpWriterInterface
{
    /**
     * @param string $content
     * @param string $filePath
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $filePath, string $archiveRemoteFilePath): void;
}
