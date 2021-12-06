<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Business\Api;

use Elastica\JSON;
use Exception;
use Spryker\Shared\Config\Config;

class FactFinderApiClient
{
    public const FACT_FINDER_ROOT_URL = 'FACT_FINDER_ROOT_URL';
    public const FACT_FINDER_USERNAME = 'FACT_FINDER_USERNAME';
    public const FACT_FINDER_PASSWORD = 'FACT_FINDER_PASSWORD';
    public const FACT_FINDER_CHANNEL = 'FACT_FINDER_CHANNEL';

    /**
     * @return string
     */
    protected function getRootUrl(): string
    {
        $url = $this->getConfigValue(static::FACT_FINDER_ROOT_URL);
        if (empty($url)) {
            $url = "https://globus-sb.fact-finder.de/fact-finder/rest/v4/";
        }

        return $url;
    }

    /**
     * @return string
     */
    protected function getUserName(): string
    {
        $userName = $this->getConfigValue(static::FACT_FINDER_USERNAME);
        if (empty($userName)) {
            $userName = "shopUser";
        }

        return $userName;
    }

    /**
     * @return string
     */
    protected function getPassword(): string
    {
        $password = $this->getConfigValue(static::FACT_FINDER_PASSWORD);
        if (empty($password)) {
            $password = "SnLIaRN5rJBv";
        }

        return $password;
    }

    /**
     * @return string
     */
    protected function getChannel(): string
    {
        $channel = $this->getConfigValue(static::FACT_FINDER_CHANNEL);
        if (empty($channel)) {
            $channel = "Spryker";
        }

        return $channel;
    }

    /**
     * @param string $name
     *
     * @return string
     */
    protected function getConfigValue(string $name): string
    {
        try {
            return Config::get($name);
        } catch (Exception $ex) {
            return "";
        }
    }

    /**
     * @param string $url
     *
     * @return resource|false
     */
    protected function createCurl(string $url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, $this->getUserName() . ":" . $this->getPassword());
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
    protected function getReturnData($ch): array
    {
        try {
            $output = curl_exec($ch);
            //$info = curl_getinfo($ch);
            curl_close($ch);
        } catch (Exception $ex) {
            $output = JSON::stringify(["error" => $ex->getMessage(), "error_description" => $ex->getMessage()]);
        }

        return JSON::parse($output);
    }

    /**
     * @param string $url
     * @param array $data
     *
     * @return array
     */
    protected function getData(string $url, array $data): array
    {
        $ch = $this->createCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

        return $this->getReturnData($ch);
    }

    /**
     * @param string $url
     * @param array $data
     *
     * @return array
     */
    protected function putData(string $url, array $data): array
    {
        $ch = $this->createCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, JSON::stringify($data));

        return $this->getReturnData($ch);
    }

    /**
     * @param string $url
     * @param array $data
     *
     * @return array
     */
    protected function postData(string $url, array $data): array
    {
        $ch = $this->createCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, JSON::stringify($data));

        return $this->getReturnData($ch);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function updateRecords(array $data): array
    {
        $url = $this->getRootUrl() . 'records/' . $this->getChannel();

        return $this->putData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function insertRecords(array $data): array
    {
        $url = $this->getRootUrl() . 'records/' . $this->getChannel();

        return $this->postData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function updateGeoData(array $data): array
    {
        $url = $this->getRootUrl() . 'records/' . $this->getChannel() . '/geo';

        return $this->postData($url, $data);
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function deleteGeoData(array $data): array
    {
        $url = $this->getRootUrl() . 'records/' . $this->getChannel() . '/geo';

        return $this->postData($url, $data);
    }

    /**
     * @param string $event
     * @param array $data
     *
     * @return array|void
     */
    public function execByEventName(string $event, array $data)
    {
        if (str_ends_with($event, 'put')) {
            if (str_starts_with($event, 'records.')) {
                return $this->updateRecords($data);
            }
        }
        if (str_ends_with($event, 'post')) {
            if (str_starts_with($event, 'records.')) {
                return $this->insertRecords($data);
            }
            if (str_starts_with($event, 'geodata.')) {
                return $this->updateGeoData($data);
            }
        }
    }
}
