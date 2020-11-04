<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantStorage;

use Generated\Shared\Transfer\MerchantCollectionTransfer;

interface MerchantStorageClientInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getMerchantsList(): MerchantCollectionTransfer;
}
