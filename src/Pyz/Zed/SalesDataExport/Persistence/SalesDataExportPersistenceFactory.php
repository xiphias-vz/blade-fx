<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence;

use Orm\Zed\Sales\Persistence\Base\SpySalesOrderQuery;
use Orm\Zed\Sales\Persistence\SpySalesExpenseQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToUtilEncodingServiceInterface;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\CustomSalesOrderItemMapper;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesExpenseMapper;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderCommentMapper;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderItemMapper;
use Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper;
use Pyz\Zed\SalesDataExport\SalesDataExportDependencyProvider;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\SalesDataExport\Persistence\SalesDataExportRepositoryInterface getRepository()
 * @method \Pyz\Zed\SalesDataExport\SalesDataExportConfig getConfig()
 */
class SalesDataExportPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper
     */
    public function createSalesOrderMapper(): SalesOrderMapper
    {
        return new SalesOrderMapper($this->createSalesOrderCommentMapper());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderItemMapper
     */
    public function createSalesOrderItemMapper(): SalesOrderItemMapper
    {
        return new SalesOrderItemMapper();
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderCommentMapper
     */
    public function createSalesOrderCommentMapper(): SalesOrderCommentMapper
    {
        return new SalesOrderCommentMapper($this->getUtilEncodingService());
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesExpenseMapper
     */
    public function createSalesExpenseMapper(): SalesExpenseMapper
    {
        return new SalesExpenseMapper();
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper\CustomSalesOrderItemMapper
     */
    public function createCustomSalesOrderItemMapper(): CustomSalesOrderItemMapper
    {
        return new CustomSalesOrderItemMapper();
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\Base\SpySalesOrderQuery
     */
    public function getSalesOrderPropelQuery(): SpySalesOrderQuery
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::PROPEL_QUERY_SALES_ORDER);
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function getSalesOrderItemPropelQuery(): SpySalesOrderItemQuery
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::PROPEL_QUERY_SALES_ORDER_ITEM);
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesExpenseQuery
     */
    public function getSalesExpensePropelQuery(): SpySalesExpenseQuery
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::PROPEL_QUERY_SALES_EXPENSE);
    }

    /**
     * @return \Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToUtilEncodingServiceInterface
     */
    public function getUtilEncodingService(): SalesDataExportToUtilEncodingServiceInterface
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::SERVICE_UTIL_ENCODING);
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function getCustomSalesOrderItemPropelQuery(): SpySalesOrderItemQuery
    {
        return $this->getProvidedDependency(SalesDataExportDependencyProvider::PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM);
    }
}
