<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring;

use Elastica\JSON;
use Pyz\Client\Monitoring\Zed\MonitoringStub;
use Spryker\Client\Kernel\AbstractFactory;

/**
 * @method \Pyz\Client\Monitoring\MonitoringConfig getConfig()
 */
class MonitoringFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\Monitoring\Zed\MonitoringStub
     */
    public function createMonitoringStub()
    {
        return new MonitoringStub($this->getZedRequestClient());
    }

    /**
     * @return mixed
     */
    public function getSearchClient()
    {
        return $this->getProvidedDependency(MonitoringDependencyProvider::CLIENT_SEARCH);
    }

    /**
     * @return mixed
     */
    protected function getZedRequestClient()
    {
        return $this->getProvidedDependency(MonitoringDependencyProvider::CLIENT_ZED_REQUEST);
    }

    /**
     * @param string $searchString
     *
     * @return mixed
     */
    public function createCatalogSearchQuery(string $searchString)
    {
        $searchQuery = $this->getCatalogSearchQueryPlugin();
        $searchQuery->setSearchString($searchString);

        return $searchQuery;
    }

    /**
     * @return mixed
     */
    protected function getCatalogSearchQueryPlugin()
    {
        return $this->getProvidedDependency(MonitoringDependencyProvider::CATALOG_SEARCH_QUERY_PLUGIN);
    }

    /**
     * @param string $searchQuery
     *
     * @return array
     */
    public function createFFCall(string $searchQuery)
    {
        $ffChannel = $this->getFactFinderChannel();
        $ffUrl = $this->getFactFinderUrl() . '/rest/v4/search/' . $ffChannel . '?query=' . $searchQuery;
        $username = $this->getFactFinderUsername();
        $password = $this->getFactFinderPassword();

        $ch = curl_init($ffUrl);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $return = curl_exec($ch);
        curl_close($ch);

        return JSON::parse($return);
    }

    /**
     * @return string
     */
    protected function getFactFinderUrl(): string
    {
        return $this->getConfig()->getFactFinderUrl();
    }

    /**
     * @return string
     */
    protected function getFactFinderChannel(): string
    {
        return $this->getConfig()->getFactFinderChannel();
    }

    /**
     * @return string
     */
    protected function getFactFinderUsername(): string
    {
        return $this->getConfig()->getFactFinderUsername();
    }

    /**
     * @return string
     */
    protected function getFactFinderPassword(): string
    {
        return $this->getConfig()->getFactFinderPassword();
    }
}
