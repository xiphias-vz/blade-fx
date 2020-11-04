<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business;

use Spryker\Zed\MerchantDataImport\Business\MerchantDataImportFacade as SprykerMerchantDataImportFacade;

/**
 * @method \Pyz\Zed\MerchantDataImport\Business\MerchantDataImportBusinessFactory getFactory()
 */
class MerchantDataImportFacade extends SprykerMerchantDataImportFacade implements MerchantDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\StoreTransfer[] $stores
     *
     * @return void
     */
    public function triggerMerchantPublishEventsForStores(array $stores): void
    {
        $this->getFactory()
            ->createMerchantStoreEventTrigger()
            ->publishMerchants($stores);
    }
}
