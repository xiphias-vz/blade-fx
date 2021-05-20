<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface getRepository()
 */
class MerchantStorageFacade extends AbstractFacade implements MerchantStorageFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void
    {
        $this->getFactory()->createMerchantStorageWriter()->publish($eventTransfers);
    }

    /**
     * @return void
     */
    public function synchronizeMerchantToStorage(): void
    {
        $this->getFactory()->createMerchantStorageWriter()->updateMerchantsToStorage();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function writeCollectionByDeliveryPostalCodeEvents(array $eventTransfers): void
    {
        $this->getFactory()->createMerchantStorageWriter()->writeMerchantListStorageCollectionByDeliveryPostalCodeEvents($eventTransfers);
    }
}
