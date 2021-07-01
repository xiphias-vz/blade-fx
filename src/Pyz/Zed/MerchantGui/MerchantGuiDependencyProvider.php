<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui;

use Pyz\Zed\AssortmentZone\Business\AssortmentZoneFacadeInterface;
use Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SpyMerchantGuiDependencyProvider;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserBridge;

/**
 * @method \Spryker\Zed\MerchantGui\MerchantGuiConfig getConfig()
 */
class MerchantGuiDependencyProvider extends SpyMerchantGuiDependencyProvider
{
    public const FACADE_USER = 'FACADE_USER';
    public const FACADE_ACL = 'FACADE_ACL';
    public const MERCHANT_STORAGE_FACADE = 'MERCHANT_STORAGE_FACADE';
    public const ASSORTMENT_ZONES = 'ASSORTMENT_ZONES';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addUserFacade($container);
        $container = $this->addAclFacade($container);
        $container = $this->addMerchantStorageFacade($container);
        $container = $this->addAssortmentZonesFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addUserFacade(Container $container)
    {
        $container[static::FACADE_USER] = function (Container $container) {
            return new SalesToUserBridge($container->getLocator()->user()->facade());
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMerchantStorageFacade(Container $container)
    {
        $container->set(static::MERCHANT_STORAGE_FACADE, function (Container $container): MerchantStorageFacadeInterface {
            return $container->getLocator()->merchantStorage()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addAclFacade(Container $container): Container
    {
        $container->set(static::FACADE_ACL, function (Container $container): AclFacadeInterface {
            return $container->getLocator()->acl()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addAssortmentZonesFacade(Container $container): Container
    {
        $container->set(static::ASSORTMENT_ZONES, function (Container $container): AssortmentZoneFacadeInterface {
            return $container->getLocator()->assortmentZone()->facade();
        });

        return $container;
    }
}
