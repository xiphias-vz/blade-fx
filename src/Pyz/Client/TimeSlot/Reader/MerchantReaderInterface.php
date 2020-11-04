<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

use Generated\Shared\Transfer\MerchantTransfer;

interface MerchantReaderInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getCurrentMerchant(): MerchantTransfer;
}
