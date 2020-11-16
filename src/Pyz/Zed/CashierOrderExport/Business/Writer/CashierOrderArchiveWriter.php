<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

use League\Flysystem\Filesystem;
use League\Flysystem\ZipArchive\ZipArchiveAdapter;

class CashierOrderArchiveWriter implements CashierOrderArchiveWriterInterface
{
    /**
     * @param string $archiveFilePath
     * @param string $fileNameInArchive
     * @param string $content
     *
     * @return bool
     */
    public function addContentToArchive(string $archiveFilePath, string $fileNameInArchive, string $content): bool
    {
        $zipArchiveFileSystem = new Filesystem(new ZipArchiveAdapter($archiveFilePath));

        $zipArchiveFileSystem->write($fileNameInArchive, $content);

        /** @var ZipArchiveAdapter $zipArchiveFileSystemAdapter */
        $zipArchiveFileSystemAdapter = $zipArchiveFileSystem->getAdapter();

        return $zipArchiveFileSystemAdapter->getArchive()->close();
    }
}
