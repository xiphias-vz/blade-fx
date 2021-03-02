<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Communication;

use Pyz\Zed\SalesOrderSummaryExport\Business\Writer\SalesOrderSummaryExportSftpWriter;
use Pyz\Zed\SalesOrderSummaryExport\Business\Writer\SalesOrderSummaryExportSftpWriterInterface;
use Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportPersistenceFactory;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportDependencyProvider;

/**
 * Class SalesOrderSummaryExportCommunicationFactory
 *
 * @method \Pyz\Zed\SalesOrderSummaryExport\Business\SalesOrderSummaryExportFacadeInterface getFacade()
 * @method \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportDependencyProvider getProvidedDependency($key)
 */
class SalesOrderSummaryExportCommunicationFactory extends SalesOrderSummaryExportPersistenceFactory
{
    /**
     * @param string $content
     *
     * @return void
     */
    public function exportOrders(string $content): void
    {
        $this->createSalesOrderSummaryExportSftpWriter()->sendFileToFtp($content, "ordersummary.csv");
    }

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
     * @return \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportDependencyProvider
     */
    public function getFileSystemService(): SalesOrderSummaryExportDependencyProvider
    {
        return $this->getProvidedDependency(SalesOrderSummaryExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }
}
