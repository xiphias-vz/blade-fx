<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use Orm\Zed\Product\Persistence\SpyProductQuery;
use Orm\Zed\Sales\Persistence\SpySalesShipmentQuery;
use Orm\Zed\Stock\Persistence\SpyStockProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Spryker\Zed\Sales\Persistence\SalesPersistenceFactory as SprykerSalesPersistenceFactory;

/**
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Sales\Persistence\SalesEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class SalesPersistenceFactory extends SprykerSalesPersistenceFactory
{
    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesShipmentQuery
     */
    public function createSalesShipmentQuery(): SpySalesShipmentQuery
    {
        return SpySalesShipmentQuery::create();
    }

    /**
     * @return \Orm\Zed\Stock\Persistence\SpyStockQuery
     */
    public function createStockQuery(): SpyStockQuery
    {
        return SpyStockQuery::create();
    }

    /**
     * @return \Orm\Zed\Stock\Persistence\SpyStockProductQuery
     */
    public function createSpyStockProductQuery(): SpyStockProductQuery
    {
        return SpyStockProductQuery::create();
    }

    /**
     * @return \Orm\Zed\Product\Persistence\SpyProductQuery
     */
    public function createProductQuery(): SpyProductQuery
    {
        return SpyProductQuery::create();
    }
}
