<?php

namespace Pyz\Zed\RecommendationsStorage\Business;

use Generated\Shared\Transfer\EventEntityTransfer;

interface RecommendationsStorageFacadeInterface
{
    /**
     * @param EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void;

    /**
     * @return void
     */
    public function synchronizeMerchantToStorage(): void;
}
