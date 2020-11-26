<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business;

use Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregator;
use Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregatorInterface;
use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilder;
use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportReadinessChecker;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportReadinessCheckerInterface;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportStatusChecker;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportStatusCheckerInterface;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileChecker;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface;
use Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleter;
use Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface;
use Pyz\Zed\CashierOrderExport\Business\Exporter\CashierOrderExporter;
use Pyz\Zed\CashierOrderExport\Business\Exporter\CashierOrderExporterInterface;
use Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolver;
use Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriter;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriterInterface;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriter;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriter;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriterInterface;
use Pyz\Zed\CashierOrderExport\CashierOrderExportDependencyProvider;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;

/**
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepository getRepository()
 */
class CashierOrderExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Exporter\CashierOrderExporterInterface
     */
    public function createCashierOrderExporter(): CashierOrderExporterInterface
    {
        return new CashierOrderExporter(
            $this->createCashierOrderWriter(),
            $this->createCashierOrderContentBuilder(),
            $this->createOrderItemAggregator()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportReadinessCheckerInterface
     */
    public function createCashierOrderExportReadinessChecker(): CashierOrderExportReadinessCheckerInterface
    {
        return new CashierOrderExportReadinessChecker();
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface
     */
    public function createCashierOrderContentBuilder(): CashierOrderContentBuilderInterface
    {
        return new CashierOrderContentBuilder($this->getConfig());
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriterInterface
     */
    public function createCashierOrderWriter(): CashierOrderWriterInterface
    {
        return new CashierOrderWriter(
            $this->createCashierOrderFilePathResolver(),
            $this->createCashierOrderFileChecker(),
            $this->createCashierOrderArchiveWriter(),
            $this->createCashierOrderSftpWriter(),
            $this->createCashierOrderDeleter()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface
     */
    public function createCashierOrderSftpWriter(): CashierOrderSftpWriterInterface
    {
        return new CashierOrderSftpWriter(
            $this->getFileSystemService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface
     */
    public function createCashierOrderDeleter(): CashierOrderDeleterInterface
    {
        return new CashierOrderDeleter(
            $this->getFileSystemService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface
     */
    public function createCashierOrderFileChecker(): CashierOrderFileCheckerInterface
    {
        return new CashierOrderFileChecker(
            $this->getFileSystemService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriterInterface
     */
    public function createCashierOrderArchiveWriter(): CashierOrderArchiveWriterInterface
    {
        return new CashierOrderArchiveWriter();
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface
     */
    public function createCashierOrderFilePathResolver(): CashierOrderFileNameResolverInterface
    {
        return new CashierOrderFileNameResolver($this->getConfig());
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderExportStatusCheckerInterface
     */
    public function createCashierOrderExportStatusChecker(): CashierOrderExportStatusCheckerInterface
    {
        return new CashierOrderExportStatusChecker($this->getSalesFacade());
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregatorInterface
     */
    public function createOrderItemAggregator(): OrderItemAggregatorInterface
    {
        return new OrderItemAggregator();
    }

    /**
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(CashierOrderExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }

    /**
     * @return \Spryker\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(CashierOrderExportDependencyProvider::FACADE_SALES);
    }
}
