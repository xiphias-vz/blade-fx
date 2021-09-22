<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User;

use Pyz\Zed\Merchant\Communication\Plugin\User\MerchantFormExpanderPlugin;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Acl\Communication\Plugin\GroupPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserBridge;
use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use Spryker\Zed\UserLocale\Communication\Plugin\User\AssignUserLocalePreSavePlugin;
use Spryker\Zed\UserLocale\Communication\Plugin\User\UserLocaleTransferExpanderPlugin;
use Spryker\Zed\UserLocaleGui\Communication\Plugin\UserLocaleFormExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    public const SERVICE_USER = 'SERVICE_USER';
    public const FACADE_USER = 'FACADE_USER';
    public const FACADE_ACL = 'FACADE_ACL';

    /**
     * @uses \Spryker\Zed\Form\Communication\Plugin\Application\FormApplicationPlugin::SERVICE_FORM_CSRF_PROVIDER
     */
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addUserFacade($container);
        $container = $this->addAclFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addUserService($container);
        $container = $this->addUserFacade($container);
        $container = $this->addAclFacade($container);
        $container = $this->addCsrfProviderService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGroupPlugin(Container $container)
    {
        $container[static::PLUGIN_GROUP] = function (Container $container) {
            return new GroupPlugin();
        };

        return $container;
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTableActionExpanderPluginInterface[]
     */
    protected function getUserTableActionExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface[]
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new UserLocaleFormExpanderPlugin(),
            new MerchantFormExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTableConfigExpanderPluginInterface[]
     */
    protected function getUserTableConfigExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTableDataExpanderPluginInterface[]
     */
    protected function getUserTableDataExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserPreSavePluginInterface[]
     */
    protected function getUserPreSavePlugins(): array
    {
        return [
            new AssignUserLocalePreSavePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTransferExpanderPluginInterface[]
     */
    protected function getUserTransferExpanderPlugins(): array
    {
        return [
            new UserLocaleTransferExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addUserService(Container $container): Container
    {
        $container->set(self::SERVICE_USER, function (Container $container) {
            return $container->getLocator()->user()->service();
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
    protected function addCsrfProviderService(Container $container): Container
    {
        $container->set(static::SERVICE_FORM_CSRF_PROVIDER, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_FORM_CSRF_PROVIDER);
        });

        return $container;
    }
}
