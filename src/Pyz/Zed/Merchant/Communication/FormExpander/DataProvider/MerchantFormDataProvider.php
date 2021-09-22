<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Communication\FormExpander\DataProvider;

use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\Merchant\Communication\FormExpander\MerchantFormExpander;

class MerchantFormDataProvider
{
    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    protected $merchantFacade;

    /**
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     */
    public function __construct(MerchantFacadeInterface $merchantFacade)
    {
        $this->merchantFacade = $merchantFacade;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return [
            MerchantFormExpander::OPTIONS_MERCHANTS => $this->getMerchants(),
        ];
    }

    /**
     * @return array
     */
    protected function getMerchants(): array
    {
        $merchantCollectionTransfer = $this->merchantFacade->find(new MerchantCriteriaFilterTransfer());
        $options = [];

        foreach ($merchantCollectionTransfer->getMerchants() as $merchantTransfer) {
            $options[$merchantTransfer->getName()] = $merchantTransfer->getMerchantReference();
        }

        return $options;
    }
}
