<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\CheckoutPage;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CustomerPage\Plugin\CheckoutPage\CheckoutAddressFormDataProviderPlugin as SpryCheckoutAddressFormDataProviderPlugin;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CheckoutAddressFormDataProviderPlugin extends SpryCheckoutAddressFormDataProviderPlugin
{
    /**
     * {@inheritDoc}
     *  - Provides data for CheckoutAddressCollectionForm.
     *
     * @api
     *
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function getData(AbstractTransfer $quoteTransfer): QuoteTransfer
    {
        return $this->getFactory()
            ->createCheckoutAddressFormDataProviderLocal()
            ->getData($quoteTransfer);
    }

    /**
     * {@inheritDoc}
     *  - Provides options for CheckoutAddressCollectionForm.
     *
     * @api
     *
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return array
     */
    public function getOptions(AbstractTransfer $quoteTransfer): array
    {
        return $this->getFactory()
            ->createCheckoutAddressFormDataProviderLocal()
            ->getOptions($quoteTransfer);
    }
}
