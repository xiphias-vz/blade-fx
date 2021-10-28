<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business;

use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use Spryker\Zed\Cart\Business\CartFacadeInterface as SpyCartFacadeInterface;

interface CartFacadeInterface extends SpyCartFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductAvailabilityTransfer $productAvailabilityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    public function checkProductAvailability(ProductAvailabilityTransfer $productAvailabilityTransfer): ProductConcreteAvailabilityTransfer;
}
