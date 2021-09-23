<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business\Api\Adapter\Http;

use SprykerEco\Zed\Payone\Business\Api\Adapter\Http\Guzzle as SprykerEcoGuzzle;
use SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer;
use SprykerEco\Zed\Payone\Business\Exception\TimeoutException;

class Guzzle extends SprykerEcoGuzzle
{
    /**
     * @param \SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer $container
     * @param array $additionalParams
     *
     * @return array
     */
    public function sendRequest(AbstractRequestContainer $container, array $additionalParams = []): array
    {
        try {
            $requestParams = array_merge($container->toArray(), $additionalParams);
            ksort($requestParams);

            return $this->sendRawRequest($requestParams);
        } catch (TimeoutException $exception) {
            return [
                'status' => 'TIMEOUT',
            ];
        }
    }
}
