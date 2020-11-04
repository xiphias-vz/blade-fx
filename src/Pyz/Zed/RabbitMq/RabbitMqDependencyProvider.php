<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq;

use GuzzleHttp\Client;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\RabbitMq\RabbitMqDependencyProvider as SprykerRabbitMqDependencyProvider;

class RabbitMqDependencyProvider extends SprykerRabbitMqDependencyProvider
{
    public const BASE_CLIENT_GUZZLE = 'BASE_CLIENT_GUZZLE';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addBaseGuzzleClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addBaseGuzzleClient(Container $container)
    {
        $container[static::BASE_CLIENT_GUZZLE] = function () {
            return new Client();
        };

        return $container;
    }
}
