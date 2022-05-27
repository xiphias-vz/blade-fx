<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport;

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\Mail\MailConstants;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;
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
        $url = $this->get(MonitoringReportConstants::JENKINS_BASE_URL);
        if (!$url) {
            $url = 'https://scheduler.globus.local/';
        }

        return $url;
    }

    /**
     * @return mixed
     */
    public function getJenkinsHeartbeatUrl()
    {
        $url = $this->get(MonitoringReportConstants::JENKINS_HEARTBEAT_URL);
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

    /**
     * @return string
     */
    public function getEmailSendHeartbeatUrl(): string
    {
        return $this->get(MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT);
    }

    /**
     * @return string
     */
    public function getCashierOrderSFTPFolder(): string
    {
        return $this->get(CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY);
    }

    /**
     * @return string
     */
    public function getCashierOrderXmlSFTPFolder(): string
    {
        return $this->get(CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY);
    }

    /**
     * @return string
     */
    public function getCashierOrderTxtSFTPFolder(): string
    {
        return $this->get(CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY);
    }
}
