<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Communication\Controller;

use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use Spryker\Zed\Cart\Communication\Controller\GatewayController as SpyGatewayController;

/**
 * @method \Pyz\Zed\Cart\Business\CartFacadeInterface getFacade()
 */
class GatewayController extends SpyGatewayController
{
    /**
     * @param \Generated\Shared\Transfer\ProductAvailabilityTransfer $productAvailabilityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    public function checkProductAvailabilityAction(ProductAvailabilityTransfer $productAvailabilityTransfer): ProductConcreteAvailabilityTransfer
    {
        return $this->getFacade()->checkProductAvailability($productAvailabilityTransfer);
    }
}
