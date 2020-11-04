<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Plugin\CustomerPage;

use Spryker\Yves\Kernel\AbstractPlugin;
use SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\AfterCustomerAuthenticationSuccessPluginInterface;

/**
 * @method \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig getConfig()
 */
class SetMerchantCookieAfterCustomerAuthenticationSuccessPlugin extends AbstractPlugin implements AfterCustomerAuthenticationSuccessPluginInterface
{
    /**
     * {@inheritDoc}
     * - Sets merchant reference value to cookies after customer logs in successfully
     *
     * @api
     *
     * @return void
     */
    public function execute(): void
    {
        $customerTransfer = $this->getFactory()->getCustomerClient()->getCustomer();
        if (!$customerTransfer->getMerchantReference()) {
            return;
        }

        $selectedMerchantCookie = $this->getFactory()->createSelectedMerchantCookie();
        $selectedMerchantCookie->setMerchantReference($customerTransfer->getMerchantReference());
    }
}
