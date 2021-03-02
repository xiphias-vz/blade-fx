<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Business\Writer;

use Generated\Shared\Transfer\FileSystemContentTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemReadException;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemWriteException;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class SalesOrderSummaryExportSftpWriter implements SalesOrderSummaryExportSftpWriterInterface
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig
     */
    protected $exportConfig;

    /**
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     * @param \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig $salesOrderExportConfig
     */
    public function __construct(
        FileSystemServiceInterface $fileSystemService,
        SalesOrderSummaryExportConfig $salesOrderExportConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->exportConfig = $salesOrderExportConfig;
    }

    /**
     * @param string $content
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $archiveRemoteFilePath): void
    {
        $transfer = new FileSystemContentTransfer();
        $queryTransfer = new FileSystemQueryTransfer();
        $queryTransfer
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($this->exportConfig->getSftpFileSystemServiceProviderKey());

        $transfer
            ->setContent($content)
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($this->exportConfig->getSftpFileSystemServiceProviderKey());

        try {
            if ($this->fileSystemService->has($queryTransfer)) {
                try {
                    $this->fileSystemService->update($transfer);
                } catch (FileSystemWriteException $updateEx) {
                    dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath());
                    dump($updateEx);
                }
            } else {
                try {
                    $this->fileSystemService->write($transfer);
                } catch (FileSystemWriteException $writeEx) {
                    dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath());
                    dump($writeEx);
                }
            }
        } catch (FileSystemReadException $writeEx) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath());
            dump($writeEx);
        }
    }
}
