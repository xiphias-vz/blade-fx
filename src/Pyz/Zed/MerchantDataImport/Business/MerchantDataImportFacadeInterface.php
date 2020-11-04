<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business;

use Spryker\Zed\MerchantDataImport\Business\MerchantDataImportFacadeInterface as SprykerMerchantDataImportFacadeInterfaceAlias;

interface MerchantDataImportFacadeInterface extends SprykerMerchantDataImportFacadeInterfaceAlias
{
    /**
     * Specification:
     * - Triggers merchant publish events for specified stores.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\StoreTransfer[] $stores
     *
     * @return void
     */
    public function triggerMerchantPublishEventsForStores(array $stores): void;
}
