<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;
use voku\helper\AntiXSS;

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
        $antiXss = self::getAntiXss();
        $emailOrCardNumber = $antiXss->xss_clean($emailOrCardNumber);
        $password = $antiXss->xss_clean($password);

        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGIN);
        $data = ['id' => $emailOrCardNumber, 'password' => $password, 'strongToken' => true];
        $result = GlobusRestApiClient::post($url, $data, []);
        $parsed = json_decode($result->result);
        if (isset($parsed->strongToken) && $parsed->strongToken) {
            $_SESSION["_sf2_attributes"]["id_token_strong"] = $parsed->strongToken;
        }

        return $result->result;
    }

    /**
     * @param string $token
     *
     * @return string
     */
    public static function loginWithToken(string $token): string
    {
        $antiXss = self::getAntiXss();

        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGIN);
        $data = ['cdcToken' => $antiXss->xss_clean($token)];
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
            if (isset($val[GlobusRestApiClientCookie::FIELD_NAME_TOKEN])) {
                $token = $val[GlobusRestApiClientCookie::FIELD_NAME_TOKEN];

                return static::loginWithToken($token);
            }
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
            $uid = $val[strtolower(GlobusRestApiClientCookie::FIELD_NAME_UID)];

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
     * @param string|null $cardNumber
     *
     * @return string
     */
    public static function checkCardNumberAvailability(?string $cardNumber): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_CHECK_CARD_STATUS);
        $url = str_replace("{cardNumber}", $cardNumber, $url);
        $result = GlobusRestApiClient::get($url, []);

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
     * @param string $uid
     * @param string $idToken
     *
     * @return string
     */
    public static function getAccountInfo(string $uid, string $idToken): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_INFO);
        $url = str_replace("{UID}", $uid, $url);
        $result = GlobusRestApiClient::get($url, [], $idToken);

        return $result->result;
    }

    /**
     * @param string $uid
     * @param array $data
     * @param string $idToken
     *
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function changeAccountData(string $uid, array $data, string $idToken): GlobusRestApiResult
    {
        if (isset($_SESSION["_sf2_attributes"]["id_token_strong"])) {
            $idToken = $_SESSION["_sf2_attributes"]["id_token_strong"];
        }
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_CHANGE_PROFILE_DATA);
        $url = str_replace("{UID}", $uid, $url);

        return GlobusRestApiClient::patch($url, $data, [], $idToken);
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

    /**
     * @return \voku\helper\AntiXSS
     */
    protected static function getAntiXss(): AntiXSS
    {
        return new AntiXSS();
    }
}
