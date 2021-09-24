<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Communication;

use Pyz\Zed\MerchantStorage\MerchantStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\MerchantStorage\Communication\MerchantStorageCommunicationFactory as SprykerMerchantStorageCommunicationFactory;
use Spryker\Zed\Store\Business\StoreFacadeInterface;

/**
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface getRepository()
 */
class MerchantStorageCommunicationFactory extends SprykerMerchantStorageCommunicationFactory
{
    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(MerchantStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }

    /**
     * @return \Spryker\Zed\Store\Business\StoreFacadeInterface
     */
    public function getStoreFacade(): StoreFacadeInterface
    {
        return $this->getProvidedDependency(MerchantStorageDependencyProvider::FACADE_STORE);
    }
}
