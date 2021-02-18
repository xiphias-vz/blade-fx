<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataExport\Business;

use Pyz\Service\DataExport\DataExportServiceInterface;
use Pyz\Zed\DataExport\Business\Exporter\DataExportExecutor;
use Spryker\Zed\DataExport\DataExportDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\DataExport\DataExportConfig getConfig()
 */
class DataExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\DataExport\Business\Exporter\DataExportExecutor
     */
    public function createDataExportHandler(): DataExportExecutor
    {
        return new DataExportExecutor(
            $this->getDataEntityExporterPlugins(),
            $this->getDataExportService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Service\DataExport\DataExportServiceInterface
     */
    public function getDataExportService(): DataExportServiceInterface
    {
        return $this->getProvidedDependency(DataExportDependencyProvider::SERVICE_DATA_EXPORT);
    }

    /**
     * @return \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[]
     */
    public function getDataEntityExporterPlugins(): array
    {
        return $this->getProvidedDependency(DataExportDependencyProvider::DATA_ENTITY_EXPORTER_PLUGINS);
    }
}
