<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business\VirtualHost;

use GuzzleHttp\Client;
use Pyz\Zed\RabbitMq\RabbitMqConfig;

abstract class AbstractVirtualHostCommand implements VirtualHostCommandInterface
{
    /**
     * @var \Pyz\Zed\RabbitMq\RabbitMqConfig
     */
    protected $rabbitMqConfig;

    /**
     * @var \GuzzleHttp\Client
     */
    protected $guzzleClient;

    /**
     * @param \Pyz\Zed\RabbitMq\RabbitMqConfig $rabbitMqConfig
     * @param \GuzzleHttp\Client $guzzleClient
     */
    public function __construct(RabbitMqConfig $rabbitMqConfig, Client $guzzleClient)
    {
        $this->rabbitMqConfig = $rabbitMqConfig;
        $this->guzzleClient = $guzzleClient;
    }
}
