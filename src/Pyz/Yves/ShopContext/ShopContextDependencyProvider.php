<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopContext;

use Pyz\Yves\CustomerPage\Plugin\ShopApplication\MerchantReferenceShopContextExpanderPlugin;
use Pyz\Yves\ShopApplication\Plugin\StoreShopContextExpanderPlugin;
use Spryker\Yves\ShopContext\ShopContextDependencyProvider as SprykerShopContextDependencyProvider;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\ShopApplication\MerchantShopContextExpanderPlugin;

class ShopContextDependencyProvider extends SprykerShopContextDependencyProvider
{
    /**
     * @return \Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface[]
     */
    protected function getShopContextExpanderPlugins(): array
    {
        return [
            new MerchantShopContextExpanderPlugin(),
//            new MerchantReferenceShopContextExpanderPlugin(),
            new StoreShopContextExpanderPlugin(),
        ];
    }
}
