<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Persistence;

use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\CollectNumber\Persistence\CollectNumberPersistenceFactory getFactory()
 */
class CollectNumberEntityManager extends AbstractEntityManager implements CollectNumberEntityManagerInterface
{
    /**
     * @inheritDoc
     */
    public function saveCollectNumberToSalesOrder(int $idSalesOrder, string $collectNumber): void
    {
        $criteria = new Criteria();
        $criteria->add(SpySalesOrderTableMap::COL_COLLECT_NUMBER, $collectNumber, Criteria::EQUAL);

        $this->getFactory()
            ->createSalesOrderQuery()
            ->filterByIdSalesOrder($idSalesOrder)
            ->update($criteria);
    }
}
