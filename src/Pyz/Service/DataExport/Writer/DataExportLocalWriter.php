<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport\Writer;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportWriteResponseTransfer;
use Generated\Shared\Transfer\MessageTransfer;
use Spryker\Service\DataExport\DataExportConfig;
use Spryker\Service\DataExport\Formatter\DataExportFormatterInterface;
use Spryker\Service\DataExport\Resolver\DataExportPathResolverInterface;
use Spryker\Service\DataExport\Writer\DataExportLocalWriter as ExtendDataExportLocalWriter;

class DataExportLocalWriter extends ExtendDataExportLocalWriter implements DataExportWriterInterface
{
    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s';
    protected const ACCESS_MODE_TYPE_OVERWRITE = 'wb';
    protected const ACCESS_MODE_TYPE_APPEND = 'ab';

    protected const LOCAL_CONNECTION_PARAM_EXPORT_ROOT_DIR = 'export_root_dir';

    /**
     * @var \Spryker\Service\DataExport\Formatter\DataExportFormatterInterface
     */
    protected $dataExportFormatter;

    /**
     * @var \Spryker\Service\DataExport\Resolver\DataExportPathResolverInterface
     */
    protected $dataExportPathResolver;

    /**
     * @var \Pyz\Zed\DataExport\DataExportConfig
     */
    protected $dataExportConfig;

    /**
     * @var \Pyz\Service\DataExport\Writer\OrderSftpWriterInterface
     */
    protected $dataOrderSftpWriter;

    /**
     * @param \Spryker\Service\DataExport\Formatter\DataExportFormatterInterface $dataExportFormatter
     * @param \Spryker\Service\DataExport\Resolver\DataExportPathResolverInterface $dataExportPathResolver
     * @param \Pyz\Zed\DataExport\DataExportConfig $dataExportConfig
     * @param \Pyz\Service\DataExport\Writer\OrderSftpWriterInterface $dataOrderSftpWriter
     */
    public function __construct(
        DataExportFormatterInterface $dataExportFormatter,
        DataExportPathResolverInterface $dataExportPathResolver,
        DataExportConfig $dataExportConfig,
        OrderSftpWriterInterface $dataOrderSftpWriter
    ) {
        $this->dataExportFormatter = $dataExportFormatter;
        $this->dataExportPathResolver = $dataExportPathResolver;
        $this->dataExportConfig = $dataExportConfig;
        $this->dataOrderSftpWriter = $dataOrderSftpWriter;
        parent::__construct($dataExportFormatter, $dataExportPathResolver, $dataExportConfig);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportBatchTransfer $dataExportBatchTransfer
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportWriteResponseTransfer
     */
    public function write(
        DataExportBatchTransfer $dataExportBatchTransfer,
        DataExportConfigurationTransfer $dataExportConfigurationTransfer
    ): DataExportWriteResponseTransfer {
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
            $dataExportConfigurationTransfer->getConnection()->getParams()[static::LOCAL_CONNECTION_PARAM_EXPORT_ROOT_DIR]
        );

        if (!$this->createDirectory($filePath)) {
            return $dataExportWriteResponseTransfer
                ->setIsSuccessful(false)
                ->addMessage($this->createWriteFailErrorMessage($filePath));
        }

        $fileName = basename($filePath);
        $archiveRemoteFilePath = sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->dataExportConfig->getDefaultOrderExportDirectoryPath(),
            $fileName
        );

        $this->dataOrderSftpWriter->sendFileToFtp($dataFormatResponseTransfer->getDataFormatted(), $filePath, $archiveRemoteFilePath);

        return $dataExportWriteResponseTransfer
            ->setFileName(basename($filePath));
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportWriteResponseTransfer
     */
    protected function isValidConfiguration(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportWriteResponseTransfer
    {
        $result = (new DataExportWriteResponseTransfer())
            ->setIsSuccessful(true);

        $params = $dataExportConfigurationTransfer->getConnection()->getParams();
        if (isset($params[static::LOCAL_CONNECTION_PARAM_EXPORT_ROOT_DIR])) {
            return $result;
        }

        return $result
            ->setIsSuccessful(false)
            ->addMessage($this->createConfigurationErrorMessage($dataExportConfigurationTransfer));
    }

    /**
     * @param string $filePath
     * @param int $permission
     *
     * @return bool
     */
    protected function createDirectory(string $filePath, int $permission = 0777): bool
    {
        $dirName = dirname($filePath);

        return is_dir($dirName) || mkdir($dirName, $permission, true) || is_dir($dirName);
    }

    /**
     * @param string|null $filePath
     *
     * @return \Generated\Shared\Transfer\MessageTransfer
     */
    protected function createWriteFailErrorMessage(?string $filePath): MessageTransfer
    {
        return (new MessageTransfer())
            ->setValue(
                sprintf('Failed to write file "%s".', $filePath)
            );
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\MessageTransfer
     */
    protected function createConfigurationErrorMessage(DataExportConfigurationTransfer $dataExportConfigurationTransfer): MessageTransfer
    {
        return (new MessageTransfer())
            ->setValue(
                sprintf('Missing local connection parameter (export_root_dir) for data_entity "%s".', $dataExportConfigurationTransfer->getDataEntity())
            );
    }
}
