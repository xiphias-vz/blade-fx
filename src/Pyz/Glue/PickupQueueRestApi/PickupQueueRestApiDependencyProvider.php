<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi;

use Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientBridge;
use Spryker\Glue\Kernel\AbstractBundleDependencyProvider;
use Spryker\Glue\Kernel\Container;

class PickupQueueRestApiDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_PICKUP_QUEUE = 'CLIENT_PICKUP_QUEUE';

    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return \Spryker\Glue\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addPickupQueueClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return \Spryker\Glue\Kernel\Container
     */
    protected function addPickupQueueClient(Container $container): Container
    {
        $container->set(static::CLIENT_PICKUP_QUEUE, function (Container $container) {
            return new PickupQueueRestApiToPickupQueueClientBridge($container->getLocator()->pickupQueue()->client());
        });

        return $container;
    }
}
