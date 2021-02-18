<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport\Writer;

use Generated\Shared\Transfer\FileSystemContentTransfer;
use Pyz\Zed\DataExport\DataExportConfig;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemWriteException;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class OrderSftpWriter implements OrderSftpWriterInterface
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\DataExport\DataExportConfig
     */
    protected $dataExportConfig;

    /**
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     * @param \Pyz\Zed\DataExport\DataExportConfig $dataExportConfig
     */
    public function __construct(
        FileSystemServiceInterface $fileSystemService,
        DataExportConfig $dataExportConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->dataExportConfig = $dataExportConfig;
    }

    /**
     * @param string $content
     * @param string $filePath
     * @param string $archiveRemoteFilePath
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $filePath, string $archiveRemoteFilePath): void
    {
        $transfer = new FileSystemContentTransfer();
        $transfer->setContent($content)
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($this->dataExportConfig->getSftpFileSystemServiceProviderKey());

        try {
            $this->fileSystemService->write($transfer);
        } catch (FileSystemWriteException $ex) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath());
            dump($ex);
        }
    }
}
