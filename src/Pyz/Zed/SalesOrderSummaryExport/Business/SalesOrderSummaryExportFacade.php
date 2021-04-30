<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * Class SalesOrderSummaryExportFacade
 *
 * @method \Pyz\Zed\SalesOrderSummaryExport\Business\SalesOrderSummaryExportBusinessFactory getFactory()
 * @method \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportRepositoryInterface getRepository()
 */
class SalesOrderSummaryExportFacade extends AbstractFacade implements SalesOrderSummaryExportFacadeInterface
{
    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s';

    /**
     * @param string $content
     *
     * @return void
     */
    public function exportOrders(string $content): void
    {
        $archiveRemoteFilePath = sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->getFactory()->getConfig()->getDefaultOrderExportDirectoryPath(),
            "ordersummary.csv"
        );

        $this->getFactory()
            ->createSalesOrderSummaryExportSftpWriter()
            ->sendFileToFtp($content, $archiveRemoteFilePath);
    }

    /**
     * @param string $content
     *
     * @return void
     */
    public function exportDeeplink(string $content): void
    {
        $date = date("Ymd");
        $archiveRemoteFilePath = sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->getFactory()->getConfig()->getDefaultDeeplinkExportDirectoryPath(),
            "productdata_" . $date . ".csv"
        );

        $this->getFactory()
            ->createSalesOrderSummaryExportSftpWriter()
            ->sendFileToFtp($content, $archiveRemoteFilePath);
    }
}
