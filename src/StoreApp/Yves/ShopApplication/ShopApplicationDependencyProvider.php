<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Yves\ShopApplication;

// @codingStandardsIgnoreStart
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopShopApplicationDependencyProvider;
use StoreApp\Zed\Picker\Communication\Widget\SelectPickingZoneWidget;
// @codingStandardsIgnoreEnd
class ShopApplicationDependencyProvider extends SprykerShopShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SelectPickingZoneWidget::class,
        ];
    }
}
