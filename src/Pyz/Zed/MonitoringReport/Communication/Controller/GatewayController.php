<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Controller;

use Generated\Shared\Transfer\MonitoringTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacade getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Generated\Shared\Transfer\MonitoringTransfer
     */
    public function getDBVersionAction(MonitoringTransfer $monitoringTransfer): MonitoringTransfer
    {
        if ($monitoringTransfer->getDbResponse() != null && $monitoringTransfer->getDbResponse() == 'NO_VERSION') {
            return $this->getFacade()
                ->getDBVersion($monitoringTransfer);
        } elseif (count($monitoringTransfer->getRedisKeys()) > 0) {
            return $this->getFacade()
                ->getRedisKeys($monitoringTransfer);
        } else {
            return $this->getFacade()
                ->getDBVersion($monitoringTransfer);
        }
    }
}
