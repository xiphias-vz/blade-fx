<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StoreSwitcherWidget\Business;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\StoreSwitcherWidget\Business\StoreSwitcherWidgetBusinessFactory getFactory()
 */
class StoreSwitcherWidgetFacade extends AbstractFacade implements StoreSwitcherWidgetFacadeInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getVisibleMerchants(): MerchantTransfer
    {
        return $this->getFactory()->createStoreSwitcherReader()->getVisibleMerchants();
    }
}
