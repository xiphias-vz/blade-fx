<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantCriteriaTransfer;

interface MerchantStorageRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getMerchants(MerchantCriteriaTransfer $merchantCriteriaTransfer): MerchantCollectionTransfer;

    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer|null
     */
    public function findMerchantsListStorage(): ?MerchantCollectionTransfer;

    /**
     * @param array $merchantIds
     *
     * @return array
     */
    public function getStoreIdsByMerchantIds(array $merchantIds): array;
}
