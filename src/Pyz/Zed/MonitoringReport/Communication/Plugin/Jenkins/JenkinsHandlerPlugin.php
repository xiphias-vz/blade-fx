<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Plugin\Jenkins;

use DateInterval;
use ErrorException;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobs;
use Pyz\Zed\MonitoringReport\Communication\Console\JenkinsCheckConsole;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class JenkinsHandlerPlugin extends AbstractPlugin
{
    public const ROLE_NAME = 'JENKINS';

    /**
     * @param string $jobName
     * @param int $httpCode
     *
     * @throws \ErrorException
     *
     * @return bool|string
     */
    public function getJobData(string $jobName, int &$httpCode)
    {
        $postUrl = $this->getFactory()->getJenkinsUrl() . 'job/' . $jobName . '/api/json?tree=builds[result,timestamp]';
        $headers = [
            'Accept: application/json',
            'Content-Type: application/json',

        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $postUrl);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curlResponse = curl_exec($ch);
        if ($curlResponse === false) {
            throw new ErrorException('cURL error: ' . curl_error($ch) . ' while calling Jenkins URL ' . $postUrl);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return $curlResponse;
    }

    /**
     * @return array
     */
    public function checkAllJobs(): array
    {
        $this->getFactory()->createHeartBeat()
            ->getHeartbeat($this->getConfig()->getJenkinsHeartbeatUrl());
        $returnResult = [];
        $jobs = $this->getFactory()->getPyzMonitoringJobsQuery()->find();
        $merchantList = $this->getRepository()->getActiveMerchants();
        $httpCode = 0;
        foreach ($jobs as $job) {
            if ($job->getIsStoreRelated()) {
                foreach ($merchantList as $merchant) {
                    $jobName = $merchant->getMerchantShortName() . '__' . $job->getJobName();
                    $data = $this->getJobData($jobName, $httpCode);
                    $this->parseJobData($job, $jobName, $data, $httpCode, $returnResult);
                }
            } else {
                $data = $this->getJobData($job->getJobName(), $httpCode);
                $this->parseJobData($job, $job->getJobName(), $data, $httpCode, $returnResult);
            }
        }
        $mailsToSend = $this->getRepository()->getEmailListForRoleName(static::ROLE_NAME);

        foreach ($returnResult as $key => $result) {
            if (!$result["check"]) {
                foreach ($mailsToSend as $mail) {
                    $this->getRepository()->setEmailToSend(
                        JenkinsCheckConsole::COMMAND_DESCRIPTION,
                        $mail,
                        'JOB: ' . $key,
                        "job: " . $key
                        . ' lastSuccess: ' . ($result['lastSuccess'] ? $result['lastSuccess']->format('Y-m-d H:i:s') : '')
                        . ' lastFailure: ' . ($result['lastFailure'] ? $result['lastFailure']->format('Y-m-d H:i:s') : '')
                        . ' error: ' . $result['error']
                    );
                }
            }
        }

        return $returnResult;
    }

    /**
     * @param \Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobs $job
     * @param string $jobName
     * @param string $data
     * @param int $httpCode
     * @param array $returnResult
     *
     * @return void
     */
    protected function parseJobData(PyzMonitoringJobs $job, string $jobName, string $data, int $httpCode, array &$returnResult)
    {
        $returnResult[$jobName] = ['lastSuccess' => null, 'lastFailure' => null, 'check' => false, 'error' => ''];
        if ($data) {
            $data = json_decode($data);
            if (isset(((array)$data)["builds"])) {
                foreach (((array)$data)["builds"] as $res) {
                    $res = (array)$res;
                    $currentDate = date_create(gmdate("m/d/Y H:i:s"));
                    $result = $res["result"];
                    $timestamp = substr($res["timestamp"], 0, 10);
                    $lastExecutionTime = date_create(date('m/d/Y H:i:s', $timestamp));
                    $checkExecutionTime = date_add(clone $lastExecutionTime, new DateInterval('PT' . $job->getMaxSecDifferenceFromLastSuccess() . 'S'));
                    if ($result === "SUCCESS") {
                        $returnResult[$jobName]['lastSuccess'] = $lastExecutionTime;
                        if ($currentDate <= $checkExecutionTime) {
                            $returnResult[$jobName]['check'] = true;
                        }
                        break;
                    } elseif ($result === "FAILURE") {
                        $returnResult[$jobName]['lastFailure'] = $lastExecutionTime;
                    }
                }
            }
        } else {
            $returnResult[$jobName]['error'] = $httpCode . ' not found or declared!';
        }
    }
}
