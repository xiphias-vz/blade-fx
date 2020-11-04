<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business;

use Pyz\Zed\RabbitMq\Business\VirtualHost\InitVirtualHostCommand;
use Pyz\Zed\RabbitMq\Business\VirtualHost\RemoveVirtualHostCommand;
use Pyz\Zed\RabbitMq\Business\VirtualHost\VirtualHostCommandInterface;
use Pyz\Zed\RabbitMq\RabbitMqDependencyProvider;
use Spryker\Zed\RabbitMq\Business\RabbitMqBusinessFactory as SprykerRabbitMqBusinessFactory;

/**
 * @method \Pyz\Zed\RabbitMq\RabbitMqConfig getConfig()
 */
class RabbitMqBusinessFactory extends SprykerRabbitMqBusinessFactory
{
    /**
     * @return \Pyz\Zed\RabbitMq\Business\VirtualHost\VirtualHostCommandInterface
     */
    public function createInitVirtualHostCommand(): VirtualHostCommandInterface
    {
        return new InitVirtualHostCommand(
            $this->getConfig(),
            $this->getBaseGuzzleClient()
        );
    }

    /**
     * @return \Pyz\Zed\RabbitMq\Business\VirtualHost\VirtualHostCommandInterface
     */
    public function createRemoveVirtualHostCommand(): VirtualHostCommandInterface
    {
        return new RemoveVirtualHostCommand(
            $this->getConfig(),
            $this->getBaseGuzzleClient()
        );
    }

    /**
     * @return \GuzzleHttp\Client
     */
    public function getBaseGuzzleClient()
    {
        return $this->getProvidedDependency(RabbitMqDependencyProvider::BASE_CLIENT_GUZZLE);
    }
}
