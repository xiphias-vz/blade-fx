<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication;

use Exception;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Category\CategoryHandlerPlugin;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Jenkins\JenkinsHandlerPlugin;
use Pyz\Zed\MonitoringReport\MonitoringReportDependencyProvider;
use Spryker\Client\Search\Dependency\Plugin\SearchStringSetterInterface;
use Spryker\Client\SearchElasticsearch\SearchElasticsearchClientInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 */
class MonitoringReportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return string
     */
    public function getJenkinsUrl(): string
    {
        return $this->getConfig()->getJenkinsUrl();
    }

    /**
     * @return \Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery
     */
    public function getPyzMonitoringJobsQuery(): PyzMonitoringJobsQuery
    {
        return $this->getRepository()->getPyzMonitoringJobsQuery();
    }

    /**
     * @return \Pyz\Zed\MonitoringReport\Communication\Plugin\Jenkins\JenkinsHandlerPlugin
     */
    public function createJenkinsHandlerPlugin(): JenkinsHandlerPlugin
    {
        return new JenkinsHandlerPlugin();
    }

    /**
     * @return \Pyz\Zed\MonitoringReport\Communication\Plugin\Category\CategoryHandlerPlugin
     */
    public function createCategoryHandlerPlugin(): CategoryHandlerPlugin
    {
        return new CategoryHandlerPlugin();
    }

    /**
     * @param string $url
     *
     * @return bool
     */
    public function getHeartbeat(string $url): bool
    {
        try {
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $resp = curl_exec($curl);
            curl_close($curl);
        } catch (Exception $exception) {
            return false;
        }

        return true;
    }

    /**
     * @return \Spryker\Client\SearchElasticsearch\SearchElasticsearchClientInterface
     */
    public function getSearchClient(): SearchElasticsearchClientInterface
    {
        return $this->getProvidedDependency(MonitoringReportDependencyProvider::CLIENT_SEARCH);
    }

    /**
     * @param string $searchString
     *
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
     */
    public function getCatalogSearchQuery($searchString)
    {
        $searchQuery = $this->getCatalogSearchQueryPlugin();

        if ($searchQuery instanceof SearchStringSetterInterface) {
            $searchQuery->setSearchString($searchString);
        }

        return $searchQuery;
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
     */
    public function getCatalogSearchQueryPlugin()
    {
        return $this->getProvidedDependency(MonitoringReportDependencyProvider::CATALOG_SEARCH_QUERY_PLUGIN);
    }
}
