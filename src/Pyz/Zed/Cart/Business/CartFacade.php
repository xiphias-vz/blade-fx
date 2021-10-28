<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business;

use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use Spryker\Zed\Cart\Business\CartFacade as SpyCartFacade;

/**
 * @method \Pyz\Zed\Cart\Business\CartBusinessFactory getFactory()
 */
class CartFacade extends SpyCartFacade implements CartFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductAvailabilityTransfer $productAvailabilityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    public function checkProductAvailability(ProductAvailabilityTransfer $productAvailabilityTransfer): ProductConcreteAvailabilityTransfer
    {
        return $this->getFactory()->createProductAvailability()->checkAvailabilityOfProduct($productAvailabilityTransfer);
    }
}
