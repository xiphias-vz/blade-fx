<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;

class GlobusRestApiClientAccount
{
    /**
     * @param string $emailOrCardNumber
     * @param string $password
     *
     * @return string
     */
    public static function login(string $emailOrCardNumber, string $password): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGIN);
        $data = ['id' => $emailOrCardNumber, 'password' => $password];
        $result = GlobusRestApiClient::post($url, $data, []);

        return $result->result;
    }

    /**
     * @param string $token
     *
     * @return string
     */
    public static function loginWithToken(string $token): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGIN);
        $data = ['cdcToken' => $token];
        $result = GlobusRestApiClient::post($url, $data, []);

        return $result->result;
    }

    /**
     * @return string
     */
    public static function loginWithCookie(): string
    {
        if (isset($_COOKIE[GlobusRestApiClientCookie::COOKIE_NAME])) {
            $val = json_decode($_COOKIE[GlobusRestApiClientCookie::COOKIE_NAME], true);
            $token = $val[GlobusRestApiClientCookie::FIELD_NAME_TOKEN];

            return static::loginWithToken($token);
        }

        return "";
    }

    /**
     * @param string $uid
     *
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function logout(string $uid): GlobusRestApiResult
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGOUT);
        $data = ['UID' => $uid];

        return GlobusRestApiClient::post($url, $data, []);
    }

    /**
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function logoutWithCookie(): GlobusRestApiResult
    {
        if (isset($_COOKIE[GlobusRestApiClientCookie::COOKIE_NAME])) {
            $val = json_decode($_COOKIE[GlobusRestApiClientCookie::COOKIE_NAME], true);
            $uid = $val[GlobusRestApiClientCookie::FIELD_NAME_UID];

            return static::logout($uid);
        }

        return new GlobusRestApiResult();
    }

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public static function checkEmailOrCardAvailability(string $emailOrCardNumber): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_AVAILABLE);
        $data = ['id' => $emailOrCardNumber];
        $result = GlobusRestApiClient::post($url, $data, []);

        return $result->result;
    }

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public static function passwordReset(string $emailOrCardNumber): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_PASSWORD_RESET);
        $data = ['id' => $emailOrCardNumber];
        $result = GlobusRestApiClient::post($url, $data, []);

        return $result->result;
    }

    /**
     * @param string $uuid
     * @param string $idToken
     *
     * @return string
     */
    public static function getPayBackInfoFromAccount(string $uuid, string $idToken): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_PAYBACK_INFO);
        $url = str_replace("uuid", $uuid, $url);
        $result = GlobusRestApiClient::get($url, [], $idToken);

        return $result->result;
    }

    /**
     * @param string $data
     *
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function registrationFull(string $data): GlobusRestApiResult
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_REGISTRATION_FULL);

        return GlobusRestApiClient::post($url, $data, []);
    }
}
