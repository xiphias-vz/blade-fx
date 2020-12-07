<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RabbitMq;

use Pyz\Client\RabbitMq\Model\Connection\ConnectionBuilder\ConnectionBuilder;
use Spryker\Client\RabbitMq\Model\Connection\ConnectionBuilder\ConnectionBuilderInterface;
use Spryker\Client\RabbitMq\RabbitMqFactory as SprykerRabbitMqFactory;

/**
 * @method \Spryker\Client\RabbitMq\RabbitMqConfig getConfig()
 */
class RabbitMqFactory extends SprykerRabbitMqFactory
{
    /**
     * @return \Spryker\Client\RabbitMq\Model\Connection\ConnectionBuilder\ConnectionBuilderInterface
     */
    public function createConnectionBuilder(): ConnectionBuilderInterface
    {
        return new ConnectionBuilder(
            $this->getConfig(),
            $this->getStoreClient(),
            $this->createQueueEstablishmentHelper()
        );
    }
}
