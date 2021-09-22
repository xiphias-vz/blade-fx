<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantSearch;

use Pyz\Client\MerchantStorage\MerchantStorageClient;
use Spryker\Client\Kernel\AbstractFactory;

class MerchantSearchFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\MerchantStorage\MerchantStorageClient
     */
    public function getMerchantStorageClient(): MerchantStorageClient
    {
        return $this->getProvidedDependency(MerchantSearchDependencyProvider::CLIENT_MERCHANT_STORAGE);
    }
}
