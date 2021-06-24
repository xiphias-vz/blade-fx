<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataExport;

use Spryker\Service\DataExport\DataExportServiceInterface;
use Spryker\Zed\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;
use Spryker\Zed\DataExport\Dependency\Facade\DataExportToGracefulRunnerFacadeBridge;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderDataEntityExporterPlugin;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderExpenseDataEntityExporterPlugin;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderItemDataEntityExporterPlugin;

/**
 * @method \Spryker\Zed\DataExport\DataExportConfig getConfig()
 */
class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    public const FACADE_GRACEFUL_RUNNER = 'FACADE_GRACEFUL_RUNNER';
    public const SERVICE_DATA_EXPORT = 'SERVICE_DATA_EXPORT';

    public const DATA_ENTITY_EXPORTER_PLUGINS = 'DATA_ENTITY_EXPORTER_PLUGINS';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addDataExportService($container);
        $container = $this->addDataEntityExporterPlugins($container);
        $container = $this->addGracefulRunnerFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addDataExportService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDataExportService(Container $container): Container
    {
        $container->set(static::SERVICE_DATA_EXPORT, function (Container $container): DataExportServiceInterface {
            return $container->getLocator()->dataExport()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDataEntityExporterPlugins(Container $container): Container
    {
        $container->set(static::DATA_ENTITY_EXPORTER_PLUGINS, function (): array {
            return $this->getDataEntityExporterPlugins();
        });

        return $container;
    }

    /**
     * @return \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[]
     */
    protected function getDataEntityExporterPlugins(): array
    {
        return [
            new OrderDataEntityExporterPlugin(),
            new OrderItemDataEntityExporterPlugin(),
            new OrderExpenseDataEntityExporterPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGracefulRunnerFacade(Container $container): Container
    {
        $container->set(static::FACADE_GRACEFUL_RUNNER, function (Container $container) {
            return new DataExportToGracefulRunnerFacadeBridge(
                $container->getLocator()->gracefulRunner()->facade()
            );
        });

        return $container;
    }
}
