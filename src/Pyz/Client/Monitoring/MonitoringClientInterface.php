<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring;

use Generated\Shared\Transfer\MonitoringTransfer;

interface MonitoringClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return mixed
     */
    public function getDBVersion(MonitoringTransfer $monitoringTransfer);
}
