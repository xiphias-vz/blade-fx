<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Persistence;

use Generated\Shared\Transfer\MerchantRegionTransfer;

interface MerchantRegionRepositoryInterface
{
    /**
     * @param int $regionNumber
     *
     * @return \Generated\Shared\Transfer\MerchantRegionTransfer
     */
    public function getMerchantRegionByRegionNumber(int $regionNumber): MerchantRegionTransfer;

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantRegionTransfer
     */
    public function getMerchantRegionByMerchantReference(string $merchantReference): MerchantRegionTransfer;
}
