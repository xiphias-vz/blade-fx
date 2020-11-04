<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business\VirtualHost;

use Pyz\Zed\RabbitMq\Business\Exception\DefaultVirtualHostNotFoundException;

class InitVirtualHostCommand extends AbstractVirtualHostCommand
{
    /**
     * @throws \Pyz\Zed\RabbitMq\Business\Exception\DefaultVirtualHostNotFoundException
     *
     * @return int
     */
    public function execute(): int
    {
        $virtualHostName = $this->rabbitMqConfig->getVirtualHostName();

        if (!$virtualHostName) {
            throw new DefaultVirtualHostNotFoundException();
        }

        $apiUrl = $this->rabbitMqConfig->getApiVirtualHostsUrl() . '/' . urlencode($virtualHostName);
        $requestOptions = $this->rabbitMqConfig->getApiCredentials();

        $response = $this->guzzleClient->put($apiUrl, $requestOptions);

        $this->addDataDogUser($virtualHostName);

        return $response->getStatusCode();
    }

    /**
     * @param string $virtualHostName
     *
     * @return void
     */
    protected function addDataDogUser(string $virtualHostName): void
    {
        $dataDogCredentials = $this->rabbitMqConfig->getDataDogCredentials();

        $userName = (string)$dataDogCredentials['username'];
        $password = (string)$dataDogCredentials['password'];
        $tags = (array)$dataDogCredentials['tags'];
        $permissions = (array)$dataDogCredentials['permissions'];

        if ($userName === '') {
            return;
        }

        $this->createDataDogUser($userName, $password, $tags);
        $this->setDataDogUserPermissions('/', $userName, $permissions);
        $this->setDataDogUserPermissions($virtualHostName, $userName, $permissions);
    }

    /**
     * @param string $userName
     * @param string $password
     * @param string[] $tags
     *
     * @return int
     */
    protected function createDataDogUser(string $userName, string $password, array $tags): int
    {
        $apiUrl = $this->rabbitMqConfig->getApiUserUrl($userName);
        $requestOptions = $this->rabbitMqConfig->getApiCredentials();
        $requestOptions['body'] = json_encode([
            'password_hash' => $this->generatePasswordHash($password),
            'tags' => implode(',', $tags),
        ]);

        $response = $this->guzzleClient->put($apiUrl, $requestOptions);

        return $response->getStatusCode();
    }

    /**
     * @param string $virtualHostName
     * @param string $userName
     * @param string[] $permissions
     *
     * @return int
     */
    protected function setDataDogUserPermissions(string $virtualHostName, string $userName, array $permissions): int
    {
        // no permissions by default
        $defaultPermissions = [
            'configure' => '^$',
            'write' => '^$',
            'read' => '^$',
        ];

        $permissions = array_replace($defaultPermissions, $permissions);
        $permissions = array_intersect_key($permissions, $defaultPermissions);

        $apiUrl = $this->rabbitMqConfig->getApiPermissionVhostUserUrl($virtualHostName, $userName);
        $requestOptions = $this->rabbitMqConfig->getApiCredentials();
        $requestOptions['body'] = json_encode($permissions);

        $response = $this->guzzleClient->put($apiUrl, $requestOptions);

        return $response->getStatusCode();
    }

    /**
     * @param string $password
     *
     * @return string
     */
    protected function generatePasswordHash(string $password): string
    {
        $salt = random_bytes(4);
        $hash = hash('sha256', $salt . $password, true);

        return base64_encode($salt . $hash);
    }
}
