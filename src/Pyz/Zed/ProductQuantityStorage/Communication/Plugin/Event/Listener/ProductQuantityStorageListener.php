<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityStorage\Communication\Plugin\Event\Listener;

use Orm\Zed\ProductQuantity\Persistence\Map\SpyProductQuantityTableMap;
use Spryker\Zed\ProductQuantityStorage\Communication\Plugin\Event\Listener\ProductQuantityStorageListener as SprykerProductQuantityStorageListener;
use Spryker\Zed\PropelOrm\Business\Transaction\DatabaseTransactionHandlerTrait;

class ProductQuantityStorageListener extends SprykerProductQuantityStorageListener
{
    use DatabaseTransactionHandlerTrait;

    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->preventTransaction();

        $productIds = $this->getFactory()->getEventBehaviorFacade()->getEventTransferForeignKeys($eventTransfers, SpyProductQuantityTableMap::COL_FK_PRODUCT);

        $this->getFacade()->publishProductQuantity($productIds);
    }
}
