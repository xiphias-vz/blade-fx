<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Business;

use Pyz\Zed\SalesDataExport\Business\Exporter\ExporterInterface;
use Pyz\Zed\SalesDataExport\Business\Exporter\LineExporter;
use Pyz\Zed\SalesDataExport\Business\Reader\CustomOrderItemReader;
use Pyz\Zed\SalesDataExport\Business\Reader\OrderExpenseReader;
use Pyz\Zed\SalesDataExport\Business\Reader\OrderItemReader;
use Pyz\Zed\SalesDataExport\Business\Reader\OrderReader;
use Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface;
use Pyz\Zed\SalesDataExport\SalesDataExportDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\SalesDataExport\SalesDataExportConfig getConfig()
 * @method \Pyz\Zed\SalesDataExport\Persistence\SalesDataExportRepositoryInterface getRepository()
 */
class SalesDataExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Exporter\ExporterInterface
     */
    public function createOrderExporter(): ExporterInterface
    {
        return new LineExporter(
            $this->getDataExportService(),
            $this->getConfig(),
            $this->createOrderReader()
        );
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Exporter\ExporterInterface
     */
    public function createOrderItemExporter(): ExporterInterface
    {
        return new LineExporter(
            $this->getDataExportService(),
            $this->getConfig(),
            $this->createOrderItemReader()
        );
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Exporter\ExporterInterface
     */
    public function createOrderExpenseExporter(): ExporterInterface
    {
        return new LineExporter(
            $this->getDataExportService(),
            $this->getConfig(),
            $this->createOrderExpenseReader()
        );
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Exporter\ExporterInterface
     */
    public function createCustomOrderItemExporter(): ExporterInterface
    {
        return new LineExporter(
            $this->getDataExportService(),
            $this->getConfig(),
            $this->createCustomOrderItemReader()
        );
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface
     */
    public function createOrderReader(): ReaderInterface
    {
        return new OrderReader($this->getRepository());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface
     */
    public function createOrderItemReader(): ReaderInterface
    {
        return new OrderItemReader($this->getRepository());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface
     */
    public function createOrderExpenseReader(): ReaderInterface
    {
        return new OrderExpenseReader($this->getRepository());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface
     */
    public function getDataExportService(): SalesDataExportToDataExportServiceInterface
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::SERVICE_DATA_EXPORT);
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Business\Reader\ReaderInterface
     */
    public function createCustomOrderItemReader(): ReaderInterface
    {
        return new CustomOrderItemReader($this->getRepository());
    }
}
