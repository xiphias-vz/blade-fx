<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Installer;

use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Acl\Communication\Plugin\AclInstallerPlugin;
use Spryker\Zed\Country\Communication\Plugin\CountryInstallerPlugin;
use Spryker\Zed\CustomerAccess\Communication\Plugin\CustomerAccessInstallerPlugin;
use Spryker\Zed\Glossary\Communication\Plugin\GlossaryInstallerPlugin;
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Locale\Communication\Plugin\LocaleInstallerPlugin;
use Spryker\Zed\Newsletter\Communication\Plugin\NewsletterInstallerPlugin;
use Spryker\Zed\Oauth\Communication\Plugin\Installer\OauthClientInstallerPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer\OauthCustomerScopeInstallerPlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\PriceInstallerPlugin;
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\Installer\ProductAlternativeProductLabelConnectorInstallerPlugin;
use Spryker\Zed\ProductDiscontinuedProductLabelConnector\Communication\Plugin\Installer\ProductDiscontinuedProductLabelConnectorInstallerPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Installer\ProductMeasurementUnitInstallerPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Installer\ProductPackagingUnitTypeInstallerPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Installer\SalesOrderThresholdTypeInstallerPlugin;
use Spryker\Zed\Translator\Communication\Plugin\TranslatorInstallerPlugin;
use Spryker\Zed\User\Communication\Plugin\UserInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    public const STORE = 'STORE';

    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new PriceInstallerPlugin(),
            new LocaleInstallerPlugin(),
            new CountryInstallerPlugin(),
            new UserInstallerPlugin(),
            new AclInstallerPlugin(),
            new NewsletterInstallerPlugin(),
            new GlossaryInstallerPlugin(),
            new CustomerAccessInstallerPlugin(),
            new TranslatorInstallerPlugin(),
            new ProductAlternativeProductLabelConnectorInstallerPlugin(), #ProductAlternativeFeature
            new ProductDiscontinuedProductLabelConnectorInstallerPlugin(), #ProductDiscontinuedFeature
            new SalesOrderThresholdTypeInstallerPlugin(), #SalesOrderThresholdFeature
            new OauthClientInstallerPlugin(),
            new OauthCustomerScopeInstallerPlugin(),
            new ProductMeasurementUnitInstallerPlugin(),
            new ProductPackagingUnitTypeInstallerPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = $this->addStore($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStore(Container $container): Container
    {
        $container->set(static::STORE, function (Container $container): Store {
            return Store::getInstance();
        });

        return $container;
    }
}
