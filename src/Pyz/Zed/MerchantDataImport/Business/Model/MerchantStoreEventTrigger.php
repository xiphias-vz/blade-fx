<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business\Model;

use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Spryker\Zed\Event\Business\EventFacadeInterface;
use Spryker\Zed\Merchant\Dependency\MerchantEvents;

class MerchantStoreEventTrigger
{
    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface
     */
    private $eventFacade;

    /**
     * @param \Spryker\Zed\Event\Business\EventFacadeInterface $eventFacade
     */
    public function __construct(EventFacadeInterface $eventFacade)
    {
        $this->eventFacade = $eventFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\StoreTransfer[] $stores
     *
     * @return void
     */
    public function publishMerchants(array $stores): void
    {
        $eventEntityTransfers = [];
        foreach ($stores as $store) {
            $eventEntityTransfers[] = (new EventEntityTransfer())->setAdditionalValues(
                [
                    SpyMerchantTableMap::COL_FK_STORE => $store->getIdStore(),
                ]
            );
        }

        $this->eventFacade->triggerBulk(
            MerchantEvents::MERCHANT_PUBLISH,
            $eventEntityTransfers
        );
    }
}
