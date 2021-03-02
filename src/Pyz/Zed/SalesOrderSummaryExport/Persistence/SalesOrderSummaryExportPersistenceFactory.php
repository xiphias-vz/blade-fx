<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Persistence;

use Pyz\Zed\SalesOrderSummaryExport\Persistence\Propel\Mapper\SalesOrderSummaryExportMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportRepositoryInterface getRepository()
 * @method \Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig getConfig()
 */
class SalesOrderSummaryExportPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Pyz\Zed\SalesOrderSummaryExport\Persistence\Propel\Mapper\SalesOrderSummaryExportMapper
     */
    public function createSalesOrderSummaryExportMapper(): SalesOrderSummaryExportMapper
    {
        return new SalesOrderSummaryExportMapper();
    }

    /**
     * @return \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportRepositoryInterface
     */
    public function createRepository(): SalesOrderSummaryExportRepositoryInterface
    {
        return new SalesOrderSummaryExportRepository();
    }
}
