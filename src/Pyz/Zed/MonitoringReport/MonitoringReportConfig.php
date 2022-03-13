<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport;

use Pyz\Shared\Mail\MailConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class MonitoringReportConfig extends AbstractBundleConfig
{
    public const JENKINS_URL = 'JENKINS_URL';
    public const HEARTBEAT_URL = 'HEARTBEAT_URL';

    /**
     * @return string
     */
    public function getJenkinsUrl(): string
    {
        //$config = $this->get(SchedulerJenkinsConstants::JENKINS_CONFIGURATION);
        // $config[SchedulerConfig::SCHEDULER_JENKINS];
        $url = getenv(static::JENKINS_URL);
        if (!$url) {
            $url = 'https://scheduler.globus.local/';
        }

        //return $url[SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL];
        return $url;
    }

    /**
     * @return mixed
     */
    public function getHeartbeatUrl()
    {
        $url = getenv(static::HEARTBEAT_URL);
        if (!$url) {
            $url = 'https://heartbeat.uptimerobot.com/m790706896-67260c4c15b4815d1553056adbec1e02084ccdb6';
        }

        return $url;
    }

    /**
     * @return string
     */
    public function getMailSender(): string
    {
        return $this->get(MailConstants::DEFAULT_EMAIL_SENDER_EMAIL);
    }
}
