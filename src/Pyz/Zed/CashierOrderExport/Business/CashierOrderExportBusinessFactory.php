<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business;

use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilder;
use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface;
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
            $this->createCashierOrderContentBuilder()
        );
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface
     */
    public function createCashierOrderContentBuilder(): CashierOrderContentBuilderInterface
    {
        return new CashierOrderContentBuilder($this->getRepository());
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
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(CashierOrderExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }
}
