<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Communication;

use Pyz\Zed\MerchantDataImport\MerchantDataImportDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\Store\Business\StoreFacadeInterface;

/**
 * @method \Pyz\Zed\MerchantDataImport\MerchantDataImportConfig getConfig()
 * @method \Pyz\Zed\MerchantDataImport\Business\MerchantDataImportFacadeInterface getFacade()
 */
class MerchantDataImportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Spryker\Zed\Store\Business\StoreFacadeInterface
     */
    public function getStoreFacade(): StoreFacadeInterface
    {
        return $this->getProvidedDependency(MerchantDataImportDependencyProvider::FACADE_STORE);
    }
}
