<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Business;

interface MerchantStorageFacadeInterface
{
    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void;

    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function writeCollectionByDeliveryPostalCodeEvents(array $eventTransfers): void;

    /**
     * @return void
     */
    public function synchronizeMerchantToStorage(): void;
}
