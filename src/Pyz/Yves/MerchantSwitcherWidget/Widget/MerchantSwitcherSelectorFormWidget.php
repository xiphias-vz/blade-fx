<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Widget;

use SprykerShop\Yves\MerchantSwitcherWidget\Widget\MerchantSwitcherSelectorFormWidget as SprykerMerchantSwitcherSelectorFormWidget;

/**
 * @method \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig getConfig()
 */
class MerchantSwitcherSelectorFormWidget extends SprykerMerchantSwitcherSelectorFormWidget
{
    /**
     * @return void
     */
    protected function addMerchantParameters(): void
    {
        $merchantTransfers = $this->getFactory()->getMerchantSearchClient()->getActiveMerchants()->getMerchants();

        if (!count($merchantTransfers)) {
            return;
        }

        $selectedMerchantReference = $this->getFactory()->createMerchantShopContextReader()->getCurrentMerchantReference();

        $this->addParameter('merchantTransfers', $merchantTransfers);
        $this->addParameter('selectedMerchantReference', $selectedMerchantReference);
    }
}
