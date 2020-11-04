<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantSwitcher;

use Generated\Shared\Transfer\MerchantSwitchRequestTransfer;
use Generated\Shared\Transfer\MerchantSwitchResponseTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\MerchantSwitcher\MerchantSwitcherFactory getFactory()
 */
class MerchantSwitcherClient extends AbstractClient implements MerchantSwitcherClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantSwitchRequestTransfer $merchantSwitchRequestTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSwitchResponseTransfer
     */
    public function switchMerchantInQuote(MerchantSwitchRequestTransfer $merchantSwitchRequestTransfer): MerchantSwitchResponseTransfer
    {
        $quoteTransfer = $merchantSwitchRequestTransfer->getQuote();
        $quoteTransfer->setIsPendingRecalculation(true);
        $quoteTransfer->setMerchantReference($merchantSwitchRequestTransfer->getMerchantReference());

        return (new MerchantSwitchResponseTransfer())->setQuote($quoteTransfer);
    }
}
