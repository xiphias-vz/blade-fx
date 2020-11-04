<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep as SprykerAddressStep;

class AddressStep extends SprykerAddressStep
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $data = parent::getTemplateVariables($quoteTransfer);

        $data['isBillingSameAsShippingChecked'] = $quoteTransfer->getBillingSameAsShipping();

        return $data;
    }
}
