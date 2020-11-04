<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderHistoryBoosting\Persistence;

use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

class OrderHistoryBoostingQueryContainer extends AbstractQueryContainer
{
    public function getPreviouslyBoughtSkusByCustomerReference(string $customerReference): array
    {
        $previouslyBoughtSkus =
            SpySalesOrderItemQuery::create()
                ->select([SpySalesOrderItemTableMap::COL_SKU])
                ->useOrderQuery()
                ->filterByCustomerReference($customerReference)
                ->endUse()
                ->find();

        if ($previouslyBoughtSkus->count()) {
            return array_unique($previouslyBoughtSkus->getArrayCopy());
        }

        return [];
    }
}
