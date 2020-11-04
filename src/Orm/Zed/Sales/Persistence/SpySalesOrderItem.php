<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Orm\Zed\Sales\Persistence;

use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Propel\Runtime\Connection\ConnectionInterface;
use Spryker\Zed\Sales\Persistence\Propel\AbstractSpySalesOrderItem as BaseSpySalesOrderItem;

/**
 * Skeleton subclass for representing a row from the 'spy_sales_order_item' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements. This class will only be generated as
 * long as it does not already exist in the output directory.
 */
class SpySalesOrderItem extends BaseSpySalesOrderItem
{
    /**
     * @var bool
     */
    protected $isOrderItemStateHistoryCreated = false;

    /**
     * @param \Propel\Runtime\Connection\ConnectionInterface|null $con
     *
     * @return bool
     */
    public function preSave(?ConnectionInterface $con = null)
    {
        $this->statusChanged = array_key_exists(SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE, $this->modifiedColumns) && !$this->isOrderItemStateHistoryCreated;

        return true;
    }

    /**
     * @param \Propel\Runtime\Connection\ConnectionInterface|null $con
     *
     * @return void
     */
    public function postSave(?ConnectionInterface $con = null)
    {
        if ($this->statusChanged) {
            $omsOrderItemStateHistoryEntity = $this->createOmsOrderItemStateHistoryEntity();
            $omsOrderItemStateHistoryEntity->setOrderItem($this);
            $omsOrderItemStateHistoryEntity->setState($this->getState());
            $omsOrderItemStateHistoryEntity->save();
            $this->isOrderItemStateHistoryCreated = true;
        }
        $this->statusChanged = false;
    }

    /**
     * @return bool
     */
    public function isOrderItemStateHistoryCreated(): bool
    {
        return $this->isOrderItemStateHistoryCreated;
    }

    /**
     * @param bool $isOrderItemStateHistoryCreated
     *
     * @return void
     */
    public function setIsOrderItemStateHistoryCreated(bool $isOrderItemStateHistoryCreated): void
    {
        $this->isOrderItemStateHistoryCreated = $isOrderItemStateHistoryCreated;
    }
}
