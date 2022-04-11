<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientBridge;

class RecommendationsDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CUSTOMER_CLIENT = 'CUSTOMER_CLIENT';
    public const FORM_FACTORY = 'FORM_FACTORY';
    public const RECOMMENDATIONS_FACADE = 'RECOMMENDATIONS_FACADE';
    public const EVENT_FACADE = 'EVENT_FACADE';
    public const STORE_FACADE = 'STORE_FACADE';

    public const QUERY_CONTAINER_RECOMMENDATIONS = 'QUERY_CONTAINER_RECOMMENDATIONS';

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function providePersistenceLayerDependencies(Container $container): Container
    {
        $container = parent::providePersistenceLayerDependencies($container);
        $container = $this->addCustomerClient($container);
        $container = $this->addRecommendationsQueryContainer($container);

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addCustomerClient($container);
        $container = $this->addRecommendationsQueryContainer($container);
        $container = $this->addRecommendationsFacade($container);


        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addEventFacade($container);
        $container = $this->addStoreFacade($container);


        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addCustomerClient(Container $container): Container
    {
        $container->set(static::CUSTOMER_CLIENT, function(Container $container) {
            return new CustomerPageToCustomerClientBridge($container->getLocator()->customer()->client());
        });

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addRecommendationsQueryContainer(Container $container): Container
    {
        $container->set(static::QUERY_CONTAINER_RECOMMENDATIONS, function (Container $container) {
            return $container->getLocator()->recommendations()->queryContainer();
        });

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addRecommendationsFacade(Container $container): Container
    {
        $container->set(static::RECOMMENDATIONS_FACADE, function(Container $container) {
            return $container->getLocator()->recommendations()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addEventFacade(Container $container): Container
    {
        $container->set(static::EVENT_FACADE, function (Container $container) {
            return $container->getLocator()->event()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStoreFacade(Container $container): Container
    {
        $container->set(static::STORE_FACADE, function (Container $container) {
            return $container->getLocator()->store()->facade();
        });

        return $container;
    }

}
