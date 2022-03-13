<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication;

use Exception;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Jenkins\JenkinsHandlerPlugin;
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
     * @param string $hash
     *
     * @return bool
     */
    public function getHeartbeat(string $hash): bool
    {
        try {
            $url = 'http://www.google.com';
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
}
