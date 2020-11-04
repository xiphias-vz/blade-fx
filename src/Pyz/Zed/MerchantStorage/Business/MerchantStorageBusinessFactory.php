<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Business;

use Pyz\Zed\MerchantStorage\Business\Storage\MerchantStorageWriter;
use Pyz\Zed\MerchantStorage\Business\Storage\MerchantStorageWriterInterface;
use Pyz\Zed\MerchantStorage\MerchantStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface getRepository()()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface getEntityManager()()
 */
class MerchantStorageBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\MerchantStorage\Business\Storage\MerchantStorageWriterInterface
     */
    public function createMerchantStorageWriter(): MerchantStorageWriterInterface
    {
        return new MerchantStorageWriter(
            $this->getRepository(),
            $this->getEntityManager(),
            $this->getEventBehaviorFacade()
        );
    }

    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(MerchantStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }
}
