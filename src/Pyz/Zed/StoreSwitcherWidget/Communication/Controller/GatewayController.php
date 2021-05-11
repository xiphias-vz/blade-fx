<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StoreSwitcherWidget\Communication\Controller;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\StoreSwitcherWidget\Business\StoreSwitcherWidgetFacade getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getStoresAction(): MerchantTransfer
    {
        return $this->getFacade()->getVisibleMerchants();
    }
}
