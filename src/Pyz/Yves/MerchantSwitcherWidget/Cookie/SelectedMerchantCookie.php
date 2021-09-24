<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Cookie;

use SprykerShop\Yves\MerchantSwitcherWidget\Cookie\SelectedMerchantCookie as SprykerSelectedMerchantCookie;
use Symfony\Component\HttpFoundation\Cookie;

class SelectedMerchantCookie extends SprykerSelectedMerchantCookie
{
    /**
     * @var \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig
     */
    protected $merchantSwitcherWidgetConfig;

    /**
     * @param string|null $selectedMerchantReference
     *
     * @return void
     */
    public function setMerchantReference(?string $selectedMerchantReference): void
    {
        $this->cookies->append(Cookie::create(
            $this->merchantSwitcherWidgetConfig->getMerchantSelectorCookieIdentifier(),
            $selectedMerchantReference,
            time() + $this->merchantSwitcherWidgetConfig->getMerchantSelectorCookieTimeExpiration()
        ));
    }
}
