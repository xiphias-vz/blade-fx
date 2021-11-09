<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Business\Writer;

interface FactFinderExportWriterInterface
{
    /**
     * @param string $content
     * @param string $archiveRemoteFilePath
     * @param string $fileName
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $archiveRemoteFilePath, string $fileName): void;
}
