<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence;

use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderItemMapper;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper;
use Spryker\Zed\SalesDataExport\Persistence\SalesDataExportPersistenceFactory as SpySalesDataExportPersistenceFactory;

class SalesDataExportPersistenceFactory extends SpySalesDataExportPersistenceFactory
{
    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper
     */
    public function createPyzSalesOrderMapper(): SalesOrderMapper
    {
        return new SalesOrderMapper($this->createSalesOrderCommentMapper());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderItemMapper
     */
    public function createPyzSalesOrderItemMapper(): SalesOrderItemMapper
    {
        return new SalesOrderItemMapper();
    }
}
