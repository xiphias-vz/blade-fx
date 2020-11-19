<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

interface CashierOrderArchiveWriterInterface
{
    /**
     * @param string $archiveFilePath
     * @param string $fileNameInArchive
     * @param string $content
     *
     * @return bool
     */
    public function addContentToArchive(string $archiveFilePath, string $fileNameInArchive, string $content): bool;
}
