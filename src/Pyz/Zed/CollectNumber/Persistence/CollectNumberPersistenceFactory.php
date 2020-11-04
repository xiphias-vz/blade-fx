<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Persistence;

use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\CollectNumber\CollectNumberConfig getConfig()
 */
class CollectNumberPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function createSalesOrderQuery(): SpySalesOrderQuery
    {
        return new SpySalesOrderQuery();
    }
}
