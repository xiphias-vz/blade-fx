<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget;

use Pyz\Shared\MerchantSwitcherWidget\MerchantSwitcherWidgetConstants;
use SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig as SprykerMerchantSwitcherWidgetConfig;

class MerchantSwitcherWidgetConfig extends SprykerMerchantSwitcherWidgetConfig
{
    /**
     * @return bool
     */
    public function getIsMerchantSelectorCookieSecure(): bool
    {
        return (bool)$this->get(MerchantSwitcherWidgetConstants::IS_MERCHANT_SELECTOR_COOKIE_SECURE, false);
    }

    /**
     * 30 days in seconds.
     */
    protected const MERCHANT_SELECTOR_COOKIE_TIME_EXPIRATION = 2592000;
}
