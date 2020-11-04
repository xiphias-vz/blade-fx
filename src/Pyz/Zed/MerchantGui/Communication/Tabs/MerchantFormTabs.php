<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Tabs;

use Generated\Shared\Transfer\TabsViewTransfer;
use Spryker\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs as SprykerMerchantFormTabs;

class MerchantFormTabs extends SprykerMerchantFormTabs
{
    /**
     * @param \Generated\Shared\Transfer\TabsViewTransfer $tabsViewTransfer
     *
     * @return $this
     */
    protected function setFooter(TabsViewTransfer $tabsViewTransfer)
    {
        $tabsViewTransfer->setFooterTemplate('@MerchantGui/_partials/_form-submit.twig');

        return $this;
    }
}
