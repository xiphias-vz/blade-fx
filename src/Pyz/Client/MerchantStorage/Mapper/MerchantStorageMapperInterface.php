<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantStorage\Mapper;

use Generated\Shared\Transfer\MerchantTransfer;

interface MerchantStorageMapperInterface
{
    /**
     * @param array $merchantStorageData
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantStorageDataToMerchantTransfer(
        array $merchantStorageData,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer;
}
