<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GsoaRestApiClient;

use Elastica\JSON;
use Exception;

class ApiClient
{
    public const ROOT_URL = 'https://gapi.globus.cz';

    /**
     * @param string $url
     * @param string $bearerToken
     * @param array $data
     *
     * @return array
     */
    public static function get(string $url, string $bearerToken, array $data): array
    {
        if (!empty($bearerToken)) {
            $bearerToken = "Authorization: Bearer " . $bearerToken . "\r\n";
        }
        $url = self::ROOT_URL . $url;
        if (!empty($data)) {
            $url .= '?' . http_build_query($data);
        }
        $options = [
            'http' => [
                'accept' => "Content-type: application/json\r\n",
                'header' => $bearerToken,
                'method' => 'GET',
            ],
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if (empty($result)) {
            return [];
        }

        return JSON::parse($result);
    }

    /**
     * @param string $url
     * @param string $bearerToken
     * @param array $data
     *
     * @return array
     */
    public static function post(string $url, string $bearerToken, array $data): array
    {
        $url = self::ROOT_URL . $url;
        if (!empty($bearerToken)) {
            $bearerToken = "Authorization: Bearer " . $bearerToken . "\r\n";
        }
        $data = http_build_query($data);
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n" . $bearerToken
                    . "Content-Length: " . strlen($data) . "\r\n",
                'method' => 'POST',
                'content' => $data,
            ],
        ];
        $context = stream_context_create($options);
        try {
            $result = file_get_contents($url, false, $context);
        } catch (Exception $ex) {
            $result = JSON::stringify(["error" => $ex->getMessage(), "error_description" => $ex->getMessage()]);
        }

        return JSON::parse($result);
    }
}
