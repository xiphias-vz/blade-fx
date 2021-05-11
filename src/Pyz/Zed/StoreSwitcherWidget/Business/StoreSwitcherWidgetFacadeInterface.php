<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StoreSwitcherWidget\Business;

use Generated\Shared\Transfer\MerchantTransfer;

interface StoreSwitcherWidgetFacadeInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getVisibleMerchants(): MerchantTransfer;
}
