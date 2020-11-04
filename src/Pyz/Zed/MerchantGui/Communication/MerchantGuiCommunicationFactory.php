<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication;

use Pyz\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs;
use Spryker\Zed\MerchantGui\Communication\MerchantGuiCommunicationFactory as SprykerMerchantGuiCommunicationFactory;
use Spryker\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs as SprykerMerchantFormTabs;

/**
 * @method \Spryker\Zed\MerchantGui\MerchantGuiConfig getConfig()
 */
class MerchantGuiCommunicationFactory extends SprykerMerchantGuiCommunicationFactory
{
    /**
     * @return \Spryker\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs
     */
    public function createMerchantFormTabs(): SprykerMerchantFormTabs
    {
        return new MerchantFormTabs(
            $this->getMerchantFormTabsExpanderPlugins()
        );
    }
}
