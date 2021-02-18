<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataExport\Business\Exporter;

use Generated\Shared\Transfer\DataExportConfigurationsTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportReportTransfer;
use Pyz\Service\DataExport\DataExportServiceInterface;
use Pyz\Zed\DataExport\DataExportConfig;
use Spryker\Zed\DataExport\Business\Exception\DataExporterNotFoundException;

class DataExportExecutor
{
    protected const HOOK_KEY_EXTENSION = 'extension';
    protected const HOOK_KEY_DATA_ENTITY = 'data_entity';

    /**
     * @var \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[]
     */
    protected $dataEntityExporterPlugins = [];

    /**
     * @var \Pyz\Service\DataExport\DataExportServiceInterface
     */
    protected $dataExportService;

    /**
     * @var \Pyz\Zed\DataExport\DataExportConfig
     */
    protected $dataExportConfig;

    /**
     * @param \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[] $dataEntityExporterPlugins
     * @param \Pyz\Service\DataExport\DataExportServiceInterface $dataExportService
     * @param \Pyz\Zed\DataExport\DataExportConfig $dataExportConfig
     */
    public function __construct(
        array $dataEntityExporterPlugins,
        DataExportServiceInterface $dataExportService,
        DataExportConfig $dataExportConfig
    ) {
        $this->dataExportService = $dataExportService;
        $this->dataExportConfig = $dataExportConfig;

        foreach ($dataEntityExporterPlugins as $dataEntityExporterPlugin) {
            $this->dataEntityExporterPlugins[$dataEntityExporterPlugin::getDataEntity()] = $dataEntityExporterPlugin;
        }
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationsTransfer $dataExportConfigurationsTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer[]
     */
    public function exportDataEntities(DataExportConfigurationsTransfer $dataExportConfigurationsTransfer): array
    {
        $dataExportResultTransfers = [];

        $dataExportDefaultsConfigurationsTransfer = $this->getDataExportDefaultsConfiguration();
        $dataExportDefaultsConfigurationTransfer = $this->dataExportService->mergeDataExportConfigurationTransfers(
            $dataExportConfigurationsTransfer->getDefaults() ?? new DataExportConfigurationTransfer(),
            $dataExportDefaultsConfigurationsTransfer->getDefaults()
        );

        foreach ($dataExportConfigurationsTransfer->getActions() as $dataExportConfigurationTransfer) {
            $dataExportConfigurationTransfer = $this->dataExportService->mergeDataExportConfigurationTransfers(
                $dataExportConfigurationTransfer,
                clone $dataExportDefaultsConfigurationTransfer
            );
            $dataExportConfigurationTransfer = $this->addDataExportConfigurationActionHooks($dataExportConfigurationTransfer);

            $dataExportResultTransfers[] = $this->runExport($dataExportConfigurationTransfer);
        }

        return $dataExportResultTransfers;
    }

    /**
     * @return \Generated\Shared\Transfer\DataExportConfigurationsTransfer
     */
    protected function getDataExportDefaultsConfiguration(): DataExportConfigurationsTransfer
    {
        return $this->dataExportService->parseConfiguration(
            $this->dataExportConfig->getExportConfigurationDefaultsPath()
        );
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @throws \Spryker\Zed\DataExport\Business\Exception\DataExporterNotFoundException
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    protected function runExport(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer
    {
        $dataEntity = $dataExportConfigurationTransfer->getDataEntity();
        if (isset($this->dataEntityExporterPlugins[$dataEntity])) {
            return $this->dataEntityExporterPlugins[$dataEntity]->export($dataExportConfigurationTransfer);
        }

        throw new DataExporterNotFoundException(sprintf(
            'Data exporter not found for %s data entity',
            $dataExportConfigurationTransfer->getDataEntity()
        ));
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportConfigurationTransfer
     */
    protected function addDataExportConfigurationActionHooks(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportConfigurationTransfer
    {
        $dataExportConfigurationTransfer->addHook(static::HOOK_KEY_DATA_ENTITY, $dataExportConfigurationTransfer->getDataEntity());
        $dataExportConfigurationTransfer->addHook(
            static::HOOK_KEY_EXTENSION,
            $this->dataExportService->getFormatExtension($dataExportConfigurationTransfer)
        );

        return $dataExportConfigurationTransfer;
    }
}
