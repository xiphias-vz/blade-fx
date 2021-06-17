<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GsoaRestApiClient\Provider;

use Pyz\Shared\GsoaRestApiClient\ApiClient;
use Spryker\Shared\Config\Config;

class TokenProvider
{
    public const GRAND_TYPE_CLIENT_CREDENTIALS = 'client_credentials';
    public const GRAND_TYPE_PASSWORD = 'password';
    public const GRAND_TYPE_REFRESH_TOKEN = 'refresh_token';
    public const GSOA_CLIENT_ID = 'gsoaClientId';
    public const GSOA_CLIENT_SECRET = 'gsoaClientSecret';

    /**
     * @var string
     */
    private $url = '/connect/token';

    /**
     * @return string
     */
    private function getClientId(): string
    {
        return Config::get(TokenProvider::GSOA_CLIENT_ID);
    }

    /**
     * @return string
     */
    private function getClientSecret(): string
    {
        return Config::get(TokenProvider::GSOA_CLIENT_SECRET);
    }

    /**
     * @param array|mixed $tokenScope
     *
     * @return string
     */
    public function getBearerToken($tokenScope): string
    {
        $scope = is_array($tokenScope) ? implode(" ", $tokenScope) : $tokenScope;
        $data = [
            'grant_type' => self::GRAND_TYPE_CLIENT_CREDENTIALS,
            'scope' => $scope,
            'client_id' => $this->getClientId(),
            'client_secret' => $this->getClientSecret(),
        ];
        $result = ApiClient::post($this->url, "", $data);

        return $result["access_token"];
    }

    /**
     * @param string $userName
     * @param string $password
     *
     * @return string
     */
    public function getBearerTokenByUser(string $userName, string $password): string
    {
        $scope = TokenScope::CUSTOMER_PROFILE;
        $data = [
            'grant_type' => self::GRAND_TYPE_PASSWORD,
            'scope' => $scope,
            'username' => $userName,
            'password' => $password,
            'client_id' => $this->getClientId(),
            'client_secret' => $this->getClientSecret(),
        ];
        $result = ApiClient::post($this->url, "", $data);
        if (array_key_exists("error", $result)) {
            return "ERROR: " . $result["error_description"];
        }

        return $result["access_token"];
    }
}
