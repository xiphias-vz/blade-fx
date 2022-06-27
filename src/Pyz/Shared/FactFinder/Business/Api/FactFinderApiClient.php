<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\FactFinder\Business\Api;

use Elastica\JSON;
use Exception;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Spryker\Shared\Config\Config;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;

class FactFinderApiClient
{
    /**
     * @return string
     */
    protected static function getRootUrl(): string
    {
        $url = static::getConfigValue(FactFinderConstants::FACT_FINDER_ROOT_URL);
        if (empty($url)) {
            $url = "https://globus-sb.fact-finder.de/fact-finder/rest/v4/";
        }

        return $url;
    }

    /**
     * @return string
     */
    protected static function getUserName(): string
    {
        return static::getConfigValue(FactFinderNgConstants::FACT_FINDER_USERNAME);
    }

    /**
     * @return string
     */
    protected static function getPassword(): string
    {
        return static::getConfigValue(FactFinderNgConstants::FACT_FINDER_PASSWORD);
    }

    /**
     * @return string
     */
    protected static function getChannel(): string
    {
        return static::getConfigValue(FactFinderNgConstants::FACT_FINDER_CHANNEL);
    }

    /**
     * @return string
     */
    protected static function getShopwareChannel(): string
    {
        $channel = static::getConfigValue(FactFinderConstants::FACT_FINDER_SHOPWARE_CHANNEL);
        if (empty($channel)) {
            $channel = "Shopware";
        }

        return $channel;
    }

    /**
     * @param string $name
     *
     * @return string
     */
    protected static function getConfigValue(string $name): string
    {
        try {
            return Config::get($name);
        } catch (Exception $ex) {
            return "";
        }
    }

    /**
     * @param string $url
     * @param int $timeOutSec
     *
     * @return resource|false
     */
    protected static function createCurl(string $url, int $timeOutSec = 13)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeOutSec);
        curl_setopt($ch, CURLOPT_USERPWD, static::getUserName() . ":" . static::getPassword());
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'Content-Type: application/json',
        ]);

        return $ch;
    }

    /**
     * @param resource $ch
     *
     * @return array
     */
    protected static function getReturnData($ch): array
    {
        try {
            $output = curl_exec($ch);
            $info = curl_getinfo($ch);
            curl_close($ch);
        } catch (Exception $ex) {
            $output = JSON::stringify(["error" => $ex->getMessage(), "error_description" => $ex->getMessage()]);
        }

        if (empty($output)) {
            return $info;
        }

        return JSON::parse($output);
    }

    /**
     * @param string $url
     * @param array $data
     *
     * @return array
     */
    protected static function getData(string $url, array $data): array
    {
        $ch = static::createCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

        return static::getReturnData($ch);
    }

    /**
     * @param string $url
     * @param array $data
     *
     * @return array
     */
    protected static function putData(string $url, array $data): array
    {
        $ch = static::createCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, JSON::stringify($data));

        return static::getReturnData($ch);
    }

    /**
     * @param string $url
     * @param array $data
     * @param int $timeOutSec
     *
     * @return array
     */
    protected static function postData(string $url, array $data, int $timeOutSec = 13): array
    {
        $ch = static::createCurl($url, $timeOutSec);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, JSON::stringify($data));

        return static::getReturnData($ch);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function updateRecords(array $data): array
    {
        $url = static::getRootUrl() . 'records/' . static::getChannel();

        return static::putData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function getRecords(array $data): array
    {
        $url = static::getRootUrl() . 'records/' . static::getChannel();

        return static::getData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function insertRecords(array $data): array
    {
        $url = static::getRootUrl() . 'records/' . static::getChannel();

        return static::postData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function updateGeoData(array $data): array
    {
        $url = static::getRootUrl() . 'records/' . static::getChannel() . '/geo';

        return static::postData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function deleteGeoData(array $data): array
    {
        $url = static::getRootUrl() . 'records/' . static::getChannel() . '/geo';

        return static::postData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function postTrackCartData(array $data): array
    {
        $urlSpryker = static::getRootUrl() . 'track/' . static::getChannel() . '/cart';
        $urlShopware = static::getRootUrl() . 'track/' . static::getShopwareChannel() . '/cart';

        $sprykerChannelPostData = static::postData($urlSpryker, $data, 5);
        $shopwareChannelPostData = static::postData($urlShopware, $data, 5);

        return [$sprykerChannelPostData, $shopwareChannelPostData];
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function postTrackCheckoutData(array $data): array
    {
        $urlSpryker = static::getRootUrl() . 'track/' . static::getChannel() . '/checkout';
        $urlShopware = static::getRootUrl() . 'track/' . static::getShopwareChannel() . '/checkout';

        $sprykerChannelPostData = static::postData($urlSpryker, $data, 5);
        $shopwareChannelPostData = static::postData($urlShopware, $data, 5);

        return [$sprykerChannelPostData, $shopwareChannelPostData];
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function postTrackClickData(array $data): array
    {
        $urlSpryker = static::getRootUrl() . 'track/' . static::getChannel() . '/click';
        $urlShopware = static::getRootUrl() . 'track/' . static::getShopwareChannel() . '/click';

        $sprykerChannelPostData = static::postData($urlSpryker, $data, 5);
        $shopwareChannelPostData = static::postData($urlShopware, $data, 5);

        return [$sprykerChannelPostData, $shopwareChannelPostData];
    }

    /**
     * @param string $event
     * @param array $data
     *
     * @return array|void
     */
    public static function execByEventName(string $event, array $data)
    {
        if (str_ends_with($event, 'put')) {
            if (str_starts_with($event, 'records.')) {
                return static::updateRecords($data);
            }
        }
        if (str_ends_with($event, 'post')) {
            if (str_starts_with($event, 'records.')) {
                return static::insertRecords($data);
            }
            if (str_starts_with($event, 'geodata.')) {
                return static::updateGeoData($data);
            }
        }
    }

    /**
     * @param string $merchantReference
     *
     * @return array
     */
    public static function getNavigation(string $merchantReference): array
    {
        $url = static::getRootUrl() . 'navigation/category/' . static::getChannel() . '?marketId=' . $merchantReference;

        return static::getData($url, []);
    }

    /**
     * @param string $merchantReference
     * @param string $searchTerm
     *
     * @return array
     */
    public static function getSearch(string $merchantReference, string $searchTerm): array
    {
        $url = static::getRootUrl() . 'search/' . static::getChannel() . '?query=' . $searchTerm . '&marketId=' . $merchantReference;

        return static::getData($url, []);
    }

    /**
     * @param string $name
     *
     * @return array
     */
    public static function import(string $name): array
    {
        $url = static::getRootUrl() . 'import/' . $name . '?channel=' . static::getChannel();

        return static::postData($url, []);
    }
}
