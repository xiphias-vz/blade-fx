<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business;

use Generated\Shared\Transfer\MonitoringTransfer;

interface MonitoringReportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Generated\Shared\Transfer\MonitoringTransfer
     */
    public function getDBVersion(MonitoringTransfer $monitoringTransfer): MonitoringTransfer;

    /**
     * @return mixed
     */
    public function sendAlarmMail();
}
