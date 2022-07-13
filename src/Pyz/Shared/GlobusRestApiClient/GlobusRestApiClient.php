<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GlobusRestApiClient;

use Elastica\JSON;
use Exception;
use Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult;

class GlobusRestApiClient
{
    /**
     * @param string $url
     * @param array $params $params = ['id' => 1, 'name' => 'spry']
     * @param string|null $idToken
     *
     * @return \Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function get(string $url, array $params, ?string $idToken = null): GlobusRestApiResult
    {
        $urlPrefix = GlobusRestApiConfig::getGlobusApiUrlPrefix();
        $fullUrl = $urlPrefix . $url;
        if (!empty($params)) {
            $fullUrl .= '?' . http_build_query($params);
        }
        $authorization = '';
        if (!empty($idToken)) {
            $authorization = "Authorization: Bearer " . $idToken;
        }
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => [
                'APIKey: ' . GlobusRestApiConfig::getGlobusApiKey(),
                'APISecret: ' . GlobusRestApiConfig::getGlobusApiSecretKey(),
                'Content-Type: application/json',
                'X-Forwarded-For: ' . $_SERVER['REMOTE_ADDR'],
                $authorization,
            ],
        ]);

        return static::getResult($curl);
    }

    /**
     * @param string $url
     * @param mixed $data
     * @param array $params $params = ['id' => 1, 'name' => 'spry']
     * @param string|null $bearerToken
     * @param int $timeOutSecond
     *
     * @return \Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function post(string $url, $data, array $params, ?string $bearerToken = null, int $timeOutSecond = 0): GlobusRestApiResult
    {
        $urlPrefix = GlobusRestApiConfig::getGlobusApiUrlPrefix();
        $fullUrl = $urlPrefix . $url;
        if (!empty($params)) {
            $fullUrl .= '?' . http_build_query($params);
        }
        $postData = '';
        if (!empty($data)) {
            if (is_array($data)) {
                $postData = JSON::stringify($data);
            } else {
                $postData = $data;
            }
        }

        $curl = curl_init();
        $header = [
            'APIKey: ' . GlobusRestApiConfig::getGlobusApiKey(),
            'APISecret: ' . GlobusRestApiConfig::getGlobusApiSecretKey(),
            'Content-Type: application/json',
            'X-Forwarded-For: ' . $_SERVER['REMOTE_ADDR'],
        ];
        if (!empty($bearerToken)) {
            $header[] = 'Authorization: Bearer ' . $bearerToken;
        }
        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => $timeOutSecond,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => $header,
        ]);

        return static::getResult($curl);
    }

    /**
     * @param string $url
     * @param mixed $data
     * @param array $params $params = ['id' => 1, 'name' => 'spry']
     * @param string|null $bearerToken
     *
     * @return \Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public static function patch(string $url, $data, array $params, ?string $bearerToken = null): GlobusRestApiResult
    {
        $urlPrefix = GlobusRestApiConfig::getGlobusApiUrlPrefix();
        $fullUrl = $urlPrefix . $url;
        if (!empty($params)) {
            $fullUrl .= '?' . http_build_query($params);
        }
        $postData = '';
        if (!empty($data)) {
            if (is_array($data)) {
                $postData = JSON::stringify($data);
            } else {
                $postData = $data;
            }
        }

        $curl = curl_init();
        $header = [
            'APIKey: ' . GlobusRestApiConfig::getGlobusApiKey(),
            'APISecret: ' . GlobusRestApiConfig::getGlobusApiSecretKey(),
            'Content-Type: application/json',
        ];
        if (!empty($bearerToken)) {
            $header[] = 'Authorization: Bearer ' . $bearerToken;
        }
        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'PATCH',
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => $header,
        ]);

        return static::getResult($curl);
    }

    /**
     * @param mixed $curl
     *
     * @return \Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    private static function getResult($curl): GlobusRestApiResult
    {
        $result = new GlobusRestApiResult();
        try {
            $result->result = curl_exec($curl);
            $result->error = "";
            $result->isSuccess = true;
        } catch (Exception $ex) {
            $result->result = "";
            $result->error = $ex->getMessage();
            $result->isSuccess = false;
        } finally {
            curl_close($curl);
        }

        return $result;
    }
}
