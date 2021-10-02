<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business\Updater;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Merchant\Business\Updater\MerchantUpdater as SprykerMerchantUpdater;

class MerchantUpdater extends SprykerMerchantUpdater
{
    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function executeUpdateTransaction(MerchantTransfer $merchantTransfer): MerchantTransfer
    {
        $merchantTransfer = $this->merchantEntityManager->saveMerchant($merchantTransfer);
        $merchantTransfer = $this->executeMerchantPostUpdatePlugins($merchantTransfer);

        $this->triggerPublishEvent($merchantTransfer);

        return $merchantTransfer;
    }
}
