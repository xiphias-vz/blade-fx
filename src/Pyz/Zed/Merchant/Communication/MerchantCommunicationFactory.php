<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Communication;

use Pyz\Zed\Merchant\Communication\FormExpander\DataProvider\MerchantFormDataProvider;
use Pyz\Zed\Merchant\Communication\FormExpander\MerchantFormExpander;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\Merchant\Business\MerchantFacadeInterface getFacade()
 * @method \Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface getRepository()
 * @method \Spryker\Zed\Merchant\MerchantConfig getConfig()
 */
class MerchantCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Merchant\Communication\FormExpander\MerchantFormExpander
     */
    public function createMerchantFormExpander(): MerchantFormExpander
    {
        return new MerchantFormExpander();
    }

    /**
     * @return \Pyz\Zed\Merchant\Communication\FormExpander\DataProvider\MerchantFormDataProvider
     */
    public function createMerchantFormDataProvider(): MerchantFormDataProvider
    {
        return new MerchantFormDataProvider(
            $this->getFacade()
        );
    }
}
