<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Communication\FormExpander\DataProvider;

use Generated\Shared\Transfer\MerchantCriteriaTransfer;
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
        $merchantCollectionTransfer = $this->merchantFacade->get(new MerchantCriteriaTransfer());
        $merchantsArray = $merchantCollectionTransfer->getMerchants()->getArrayCopy();

        $options = [];
        $sortedOptions = [];

        foreach ($merchantsArray as $merchant) {
            $options[$merchant["city"] . ', ' . $merchant["street"]] = $merchant["merchantReference"] . '_' . $merchant["zipCode"];
        }

        ksort($options);

        foreach ($options as $option => $value) {
            $merchantReference_zipCode = explode('_', $value);
            $merchantReference = $merchantReference_zipCode[0];
            $zipCode = $merchantReference_zipCode[1];
            $sortedOptions[$zipCode . ' ' . $option] = $merchantReference;
        }

        return $sortedOptions;
    }
}
