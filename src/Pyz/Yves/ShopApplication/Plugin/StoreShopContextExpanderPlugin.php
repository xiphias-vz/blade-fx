<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopApplication\Plugin;

use Generated\Shared\Transfer\ShopContextTransfer;
use Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \SprykerShop\Yves\ShopApplication\ShopApplicationFactory getFactory()
 */
class StoreShopContextExpanderPlugin extends AbstractPlugin implements ShopContextExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands selected merchant reference.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShopContextTransfer $shopContextTransfer
     *
     * @return \Generated\Shared\Transfer\ShopContextTransfer
     */
    public function expand(ShopContextTransfer $shopContextTransfer): ShopContextTransfer
    {
        $shopContextTransfer->setStore($this->getFactory()->getStore()->getStoreName());

        return $shopContextTransfer;
    }
}
