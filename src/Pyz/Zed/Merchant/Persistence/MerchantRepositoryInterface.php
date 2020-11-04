<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Merchant\Persistence\MerchantRepositoryInterface as SprykerMerchantRepositoryInterface;

interface MerchantRepositoryInterface extends SprykerMerchantRepositoryInterface
{
    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByMerchantReference(string $merchantReference): ?MerchantTransfer;
}
