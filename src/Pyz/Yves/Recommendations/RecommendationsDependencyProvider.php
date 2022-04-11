<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations;

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class RecommendationsDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_RECOMMENDATIONS = 'CLIENT_RECOMMENDATIONS';
    public const CLIENT_RECOMMENDATIONS_STORAGE = 'CLIENT_RECOMMENDATIONS_STORAGE';

    public const CLIENT_CUSTOMER = 'CLIENT_CUSTOMER';

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container); // TODO: Change the autogenerated stub
        $container = $this->addRecommendationsStorageClient($container);
        $container = $this->addRecommendationsClient($container);
        $container = $this->addCustomerClient($container);

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addRecommendationsStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_RECOMMENDATIONS_STORAGE, function (Container $container) {
            return $container->getLocator()->recommendationsStorage()->client();
        });

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addRecommendationsClient(Container $container): Container
    {
        $container->set(static::CLIENT_RECOMMENDATIONS, function (Container $container) {
            return $container->getLocator()->recommendations()->client();
        });

        return $container;
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    protected function addCustomerClient(Container $container): Container
    {
        $container->set(static::CLIENT_CUSTOMER, function (Container $container) {
            return $container->getLocator()->customer()->client();
        });

        return $container;
    }
}
