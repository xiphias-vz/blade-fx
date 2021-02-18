<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport;

use Pyz\Service\DataExport\Writer\DataExportLocalWriter;
use Pyz\Service\DataExport\Writer\DataExportWriter;
use Pyz\Service\DataExport\Writer\OrderSftpWriter;
use Pyz\Service\DataExport\Writer\OrderSftpWriterInterface;
use Pyz\Zed\DataExport\DataExportConfig;
use Pyz\Zed\DataExport\DataExportDependencyProvider;
use Spryker\Service\DataExport\DataExportServiceFactory as ExtendDataExportServiceFactory;
use Spryker\Service\DataExport\Writer\DataExportWriterInterface;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Service\Kernel\Container;

/**
 * @method \Pyz\Zed\DataExport\DataExportConfig getConfig()
 */
class DataExportServiceFactory extends ExtendDataExportServiceFactory
{
    public function __construct()
    {
        $this->addFileSystemService($this->getContainer());
    }

    /**
     * @return \Spryker\Service\DataExport\Writer\DataExportWriterInterface
     */
    public function createDataExportWriter(): DataExportWriterInterface
    {
        return new DataExportWriter(
            $this->getDataExportConnectionPlugins(),
            $this->createDataExportFormatter(),
            $this->createDataExportLocalWriter()
        );
    }

    /**
     * @return \Pyz\Service\DataExport\Writer\DataExportWriterInterface
     */
    public function createDataExportLocalWriter(): DataExportWriterInterface
    {
        return new DataExportLocalWriter(
            $this->createDataExportFormatter(),
            $this->createDataExportPathResolver(),
            new DataExportConfig(),
            $this->createOrderSftpWriter()
        );
    }

    /**
     * @return \Pyz\Service\DataExport\Writer\OrderSftpWriterInterface
     */
    public function createOrderSftpWriter(): OrderSftpWriterInterface
    {
        return new OrderSftpWriter(
            $this->getFileSystemService(),
            new DataExportConfig()
        );
    }

    /**
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(DataExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    public function provideServiceDependencies(Container $container)
    {
        $container = $this->addFileSystemService($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFileSystemService(Container $container)
    {
        $container[DataExportDependencyProvider::SERVICE_FILE_SYSTEM] = $container->getLocator()->fileSystem()->service();

        return $container;
    }
}
