<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface as SprykerSalesQueryContainerInterface;

interface SalesQueryContainerInterface extends SprykerSalesQueryContainerInterface
{
    /**
     * @api
     *
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function querySalesOrderDetailsWithPickingSalesOrder($idSalesOrder): SpySalesOrderQuery;
}
