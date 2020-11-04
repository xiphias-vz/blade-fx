<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business\VirtualHost;

use GuzzleHttp\Exception\ClientException;
use Pyz\Zed\RabbitMq\Business\Exception\DefaultVirtualHostNotFoundException;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

class RemoveVirtualHostCommand extends AbstractVirtualHostCommand
{
    /**
     * @throws \RuntimeException
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

        try {
            $response = $this->guzzleClient->delete($apiUrl, $requestOptions);

            return $response->getStatusCode();
        } catch (ClientException $exception) {
            if ($exception->getCode() === Response::HTTP_NOT_FOUND) {
                return Response::HTTP_OK;
            }
            throw new RuntimeException();
        }
    }
}
