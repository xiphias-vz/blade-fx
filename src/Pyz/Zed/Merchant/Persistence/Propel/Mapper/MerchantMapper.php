<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Pyz\Zed\Merchant\Persistence\MerchantRepository;
use Spryker\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapper as SprykerMerchantMapper;

class MerchantMapper extends SprykerMerchantMapper
{
    /**
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchant $spyMerchant
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantEntityToMerchantTransfer(
        SpyMerchant $spyMerchant,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer {
        $merchantTransfer = $merchantTransfer->fromArray(
            $spyMerchant->toArray(),
            true
        );

        if ($spyMerchant->hasVirtualColumn(MerchantRepository::POSTAL_GROUP_VIRTUAL_COLUMN)) {
            $merchantTransfer->setDeliveryPostalCodes(
                explode(',', $spyMerchant->getVirtualColumn(MerchantRepository::POSTAL_GROUP_VIRTUAL_COLUMN))
            );
        }

        return $merchantTransfer;
    }
}
