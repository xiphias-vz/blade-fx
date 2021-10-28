<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage\Dependency\Client;

use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use SprykerShop\Yves\CartPage\Dependency\Client\CartPageToZedRequestClientBridge as SpyCartPageToZedRequestClientBridge;

class CartPageToZedRequestClientBridge extends SpyCartPageToZedRequestClientBridge implements CartPageToZedRequestClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductAvailabilityTransfer $productAvailabilityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    public function checkProductAvailability(ProductAvailabilityTransfer $productAvailabilityTransfer): ProductConcreteAvailabilityTransfer
    {
        /** @var \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer $productConcreteAvailabilityTransfer */
         $productConcreteAvailabilityTransfer = $this->zedRequestClient->call('/cart/gateway/check-product-availability', $productAvailabilityTransfer);

         return $productConcreteAvailabilityTransfer;
    }
}
