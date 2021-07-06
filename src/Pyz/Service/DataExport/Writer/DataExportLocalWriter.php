<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport\Writer;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportWriteResponseTransfer;
use Generated\Shared\Transfer\FileSystemContentTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Zed\SalesDataExport\SalesDataExportConfig;
use Spryker\Service\DataExport\DataExportConfig;
use Spryker\Service\DataExport\Formatter\DataExportFormatterInterface;
use Spryker\Service\DataExport\Resolver\DataExportPathResolverInterface;
use Spryker\Service\DataExport\Writer\DataExportLocalWriter as SpyDataExportLocalWriter;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemReadException;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemWriteException;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class DataExportLocalWriter extends SpyDataExportLocalWriter
{
    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s';

    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @param \Spryker\Service\DataExport\Formatter\DataExportFormatterInterface $dataExportFormatter
     * @param \Spryker\Service\DataExport\Resolver\DataExportPathResolverInterface $dataExportPathResolver
     * @param \Spryker\Service\DataExport\DataExportConfig $dataExportConfig
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     */
    public function __construct(
        DataExportFormatterInterface $dataExportFormatter,
        DataExportPathResolverInterface $dataExportPathResolver,
        DataExportConfig $dataExportConfig,
        FileSystemServiceInterface $fileSystemService
    ) {
        $this->fileSystemService = $fileSystemService;
        parent::__construct($dataExportFormatter, $dataExportPathResolver, $dataExportConfig);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportBatchTransfer $dataExportBatchTransfer
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportWriteResponseTransfer
     */
    public function write(DataExportBatchTransfer $dataExportBatchTransfer, DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportWriteResponseTransfer
    {
        $dataExportWriteResponseTransfer = $this->isValidConfiguration($dataExportConfigurationTransfer);
        if (!$dataExportWriteResponseTransfer->getIsSuccessful()) {
            return $dataExportWriteResponseTransfer;
        }

        $dataFormatResponseTransfer = $this->dataExportFormatter->formatBatch($dataExportBatchTransfer, $dataExportConfigurationTransfer);
        if (!$dataFormatResponseTransfer->getIsSuccessful()) {
            return $dataExportWriteResponseTransfer
                ->setIsSuccessful(false)
                ->setMessages($dataFormatResponseTransfer->getMessages());
        }

        $filePath = $this->dataExportPathResolver->resolvePath(
            $dataExportConfigurationTransfer,
            $dataExportConfigurationTransfer->getConnectionOrFail()->getParams()[static::LOCAL_CONNECTION_PARAM_EXPORT_ROOT_DIR]
        );

        if (!$this->createDirectory($filePath)) {
            return $dataExportWriteResponseTransfer
                ->setIsSuccessful(false)
                ->addMessage($this->createWriteFailErrorMessage($filePath));
        }
        $this->sendFileToFtp(basename($filePath), $dataFormatResponseTransfer->getDataFormatted());

        return $dataExportWriteResponseTransfer
            ->setFileName(basename($filePath));
    }

    /**
     * @param string $fileName
     * @param string $content
     *
     * @return void
     */
    public function sendFileToFtp(string $fileName, string $content)
    {
        $config = new SalesDataExportConfig();
        $defaultOrderExportDirectoryPath = $config->getDefaultOrderExportDirectoryPath();
        $archiveRemoteFilePath = sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $defaultOrderExportDirectoryPath,
            $fileName
        );
        $transfer = new FileSystemContentTransfer();
        $queryTransfer = new FileSystemQueryTransfer();
        $queryTransfer
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($config->getSftpFileSystemServiceProviderKey());
        $transfer
            ->setContent($content)
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($config->getSftpFileSystemServiceProviderKey());
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
                    $test = $writeEx->getMessage();
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
