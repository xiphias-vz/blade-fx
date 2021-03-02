<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Business;

use Pyz\Zed\SalesOrderSummaryExport\Business\Writer\SalesOrderSummaryExportSftpWriter;
use Pyz\Zed\SalesOrderSummaryExport\Business\Writer\SalesOrderSummaryExportSftpWriterInterface;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportDependencyProvider;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig getConfig()
 * @method \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportRepository getRepository()
 */
class SalesOrderSummaryExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\SalesOrderSummaryExport\Business\Writer\SalesOrderSummaryExportSftpWriterInterface
     */
    public function createSalesOrderSummaryExportSftpWriter(): SalesOrderSummaryExportSftpWriterInterface
    {
        return new SalesOrderSummaryExportSftpWriter(
            $this->getFileSystemService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(SalesOrderSummaryExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }
}
