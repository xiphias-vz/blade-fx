<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RabbitMq\Model\Connection\ConnectionBuilder;

use Generated\Shared\Transfer\QueueConnectionTransfer;
use Pyz\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\Model\Connection\ConnectionBuilder\ConnectionBuilder as SprykerConnectionBuilder;
use Spryker\Client\RabbitMq\Model\Connection\ConnectionInterface;

class ConnectionBuilder extends SprykerConnectionBuilder
{
    /**
     * @param \Generated\Shared\Transfer\QueueConnectionTransfer $queueConnectionTransfer
     *
     * @return \Spryker\Client\RabbitMq\Model\Connection\ConnectionInterface
     */
    protected function createConnection(QueueConnectionTransfer $queueConnectionTransfer): ConnectionInterface
    {
        return new Connection(
            $this->createAmqpStreamConnection($queueConnectionTransfer),
            $this->queueEstablishmentHelper,
            $queueConnectionTransfer,
            $this->config
        );
    }
}
