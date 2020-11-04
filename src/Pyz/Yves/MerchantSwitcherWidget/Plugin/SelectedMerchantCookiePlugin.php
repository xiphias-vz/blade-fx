<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Plugin;

use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig getConfig()
 */
class SelectedMerchantCookiePlugin extends AbstractPlugin
{
    /**
     * Sets current merchant reference to merchant cookie
     *
     * @api
     *
     * @param string $merchantReference
     *
     * @return void
     */
    public function setMerchantReference(string $merchantReference): void
    {
        $this->getFactory()->createSelectedMerchantCookie()->setMerchantReference($merchantReference);
    }
}
