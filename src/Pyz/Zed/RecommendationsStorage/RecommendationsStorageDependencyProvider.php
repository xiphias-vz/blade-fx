<?php

namespace Pyz\Zed\RecommendationsStorage;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class RecommendationsStorageDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_EVENT_BEHAVIOR = 'FACADE_EVENT_BEHAVIOR';
    public const FACADE_STORE = 'FACADE_STORE';
    public const FACADE_RECOMMENDATIONS = 'FACADE_RECOMMENDATIONS';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        parent::provideCommunicationLayerDependencies($container);

        $container = $this->addEventBehaviourFacade($container);
        $container = $this->addStoreFacade($container);
        $container = $this->addRecommendationsFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        parent::provideBusinessLayerDependencies($container);

        $container = $this->addEventBehaviourFacade($container);
        $container = $this->addStoreFacade($container);
        $container = $this->addRecommendationsFacade($container);

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function addEventBehaviourFacade(Container $container): Container
    {
        $container->set(static::FACADE_EVENT_BEHAVIOR, function (Container $container) {
            return $container->getLocator()->eventBehavior()->facade();
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
        $container->set(static::FACADE_STORE, function (Container $container) {
            return $container->getLocator()->store()->facade();
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
        $container->set(static::FACADE_RECOMMENDATIONS, function(Container $container) {
            return $container->getLocator()->recommendations()->facade();
        });

        return $container;
    }

}
