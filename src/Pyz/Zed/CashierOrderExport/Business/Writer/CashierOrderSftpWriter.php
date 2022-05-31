<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

use Generated\Shared\Transfer\FileSystemContentTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class CashierOrderSftpWriter implements CashierOrderSftpWriterInterface
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     * @param \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig $cashierOrderExportConfig
     */
    public function __construct(
        FileSystemServiceInterface $fileSystemService,
        CashierOrderExportConfig $cashierOrderExportConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->cashierOrderExportConfig = $cashierOrderExportConfig;
    }

    /**
     * @param string $archiveFileName
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $archiveFileName, string $archiveRemoteFilePath): void
    {

        $content = $this->fileSystemService->read(
            (new FileSystemQueryTransfer())
                ->setPath($archiveFileName)
                ->setFileSystemName($this->cashierOrderExportConfig->getLocalFileSystemServiceProviderKey())
        );

        $this->fileSystemService->write(
            (new FileSystemContentTransfer())
                ->setContent($content)
                ->setPath($archiveRemoteFilePath)
                ->setFileSystemName($this->cashierOrderExportConfig->getSftpFileSystemServiceProviderKey())
        );
    }
}
