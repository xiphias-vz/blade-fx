<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Business\Exporter;

use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportReportTransfer;
use Generated\Shared\Transfer\DataExportResultTransfer;
use Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface;
use Pyz\Zed\SalesDataExport\SalesDataExportConfig;

class LineExporter implements ExporterInterface
{
    protected const READ_BATCH_SIZE = 100;

    /**
     * @var \Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface
     */
    protected $dataExportService;

    /**
     * @var \Pyz\Zed\SalesDataExport\SalesDataExportConfig
     */
    protected $salesDataExportConfig;

    /**
     * @var \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface
     */
    protected $reader;

    /**
     * @param \Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface $dataExportService
     * @param \Pyz\Zed\SalesDataExport\SalesDataExportConfig $salesDataExportConfig
     * @param \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface $reader
     */
    public function __construct(
        SalesDataExportToDataExportServiceInterface $dataExportService,
        SalesDataExportConfig $salesDataExportConfig,
        ReaderInterface $reader
    ) {
        $this->dataExportService = $dataExportService;
        $this->salesDataExportConfig = $salesDataExportConfig;
        $this->reader = $reader;
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function export(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer
    {
        $dataExportConfigurationTransfer = $this->resolveDataExportActionConfigurationTransfer($dataExportConfigurationTransfer);

        $dataExportResultTransfer = (new DataExportResultTransfer())
            ->setDataEntity($dataExportConfigurationTransfer->getDataEntity())
            ->setIsSuccessful(false);

        $offset = 0;
        do {
            $dataExportBatchTransfer = $this->reader->readBatch($dataExportConfigurationTransfer, $offset, static::READ_BATCH_SIZE);
            $dataExportWriteResponseTransfer = $this->dataExportService->write($dataExportBatchTransfer, $dataExportConfigurationTransfer);

            if (!$dataExportWriteResponseTransfer->getIsSuccessful()) {
                $dataExportResultTransfer
                    ->fromArray($dataExportWriteResponseTransfer->toArray(), true)
                    ->setExportCount($offset);

                return $this->createDataExportReportTransfer($dataExportResultTransfer);
            }

            $exportedRowCount = count($dataExportBatchTransfer->getData());
            $offset += $exportedRowCount;

            $dataExportResultTransfer
                ->setIsSuccessful(true)
                ->setExportCount($offset)
                ->setFileName($dataExportWriteResponseTransfer->getFileName());
        } while ($exportedRowCount === static::READ_BATCH_SIZE);

        return $this->createDataExportReportTransfer($dataExportResultTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportResultTransfer $dataExportResultTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    protected function createDataExportReportTransfer(DataExportResultTransfer $dataExportResultTransfer): DataExportReportTransfer
    {
        return (new DataExportReportTransfer())
            ->setIsSuccessful($dataExportResultTransfer->getIsSuccessful())
            ->addDataExportResult($dataExportResultTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportConfigurationTransfer
     */
    protected function resolveDataExportActionConfigurationTransfer(
        DataExportConfigurationTransfer $dataExportConfigurationTransfer
    ): DataExportConfigurationTransfer {
        $salesDataExportDataExportConfigurationsTransfer = $this->dataExportService->parseConfiguration(
            $this->salesDataExportConfig->getModuleDataExportConfigurationsFilePath()
        );
        $dataExportConfigurationTransfer = $this->dataExportService->resolveDataExportActionConfiguration(
            $dataExportConfigurationTransfer,
            $salesDataExportDataExportConfigurationsTransfer
        );

        return $dataExportConfigurationTransfer;
    }
}
