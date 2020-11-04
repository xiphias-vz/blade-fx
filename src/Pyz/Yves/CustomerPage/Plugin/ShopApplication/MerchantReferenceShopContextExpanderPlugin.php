<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\ShopApplication;

use Generated\Shared\Transfer\ShopContextTransfer;
use Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class MerchantReferenceShopContextExpanderPlugin extends AbstractPlugin implements ShopContextExpanderPluginInterface
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
        /** @var \Generated\Shared\Transfer\CustomerTransfer|null $customerTransfer */
        $customerTransfer = $this->getFactory()->getCustomerClient()->getCustomer();

        if (!$customerTransfer) {
            return $shopContextTransfer;
        }

        $merchantReference = $customerTransfer->getMerchantReference();

        if ($merchantReference !== null) {
            $shopContextTransfer->setMerchantReference($merchantReference);
        }

        return $shopContextTransfer;
    }
}
