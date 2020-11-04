<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq;

use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Zed\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return string
     */
    public function getApiVirtualHostsUrl(): string
    {
        return sprintf(
            '%s://%s:%s/api/vhosts',
            $this->getApiScheme(),
            $this->getApiHost(),
            $this->getApiPort()
        );
    }

    /**
     * @param string $userName
     *
     * @return string
     */
    public function getApiUserUrl(string $userName): string
    {
        return sprintf(
            '%s://%s:%s/api/users/%s',
            $this->getApiScheme(),
            $this->getApiHost(),
            $this->getApiPort(),
            urlencode($userName)
        );
    }

    /**
     * @param string $virtualHost
     * @param string $userName
     *
     * @return string
     */
    public function getApiPermissionVhostUserUrl(string $virtualHost, string $userName): string
    {
        return sprintf(
            '%s://%s:%s/api/permissions/%s/%s',
            $this->getApiScheme(),
            $this->getApiHost(),
            $this->getApiPort(),
            urlencode($virtualHost),
            urlencode($userName)
        );
    }

    /**
     * @return array
     */
    public function getApiCredentials(): array
    {
        return [
            'auth' => [
                $this->getApiUsername(),
                $this->getApiPassword(),
            ],
        ];
    }

    /**
     * @return string|null
     */
    public function getVirtualHostName(): ?string
    {
        foreach ($this->get(RabbitMqEnv::RABBITMQ_CONNECTIONS) as $connection) {
            if (isset($connection[RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION]) &&
                (bool)$connection[RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION]
            ) {
                return $connection[RabbitMqEnv::RABBITMQ_VIRTUAL_HOST];
            }
        }

        return null;
    }

    /**
     * @return array
     */
    public function getDataDogCredentials(): array
    {
        return [
            'username' => getenv('DATADOG_RBQ_USERNAME') ?: '',
            'password' => getenv('DATADOG_RBQ_PASSWORD') ?: '',
            'tags' => [
                'datadog',
                'monitoring',
            ],
            'permissions' => [
                'configure' => '^aliveness-test$',
                'write' => '^amq\.default$',
                'read' => '.*',
            ],
        ];
    }
}
