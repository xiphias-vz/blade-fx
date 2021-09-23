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
     * 30 days in seconds.
     */
    protected const MERCHANT_SELECTOR_COOKIE_TIME_EXPIRATION = 2592000;
}
