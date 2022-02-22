<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring\Zed;

use Generated\Shared\Transfer\MonitoringTransfer;
use Spryker\Client\ZedRequest\Stub\ZedRequestStub;
use Symfony\Component\Config\Definition\Exception\Exception;

class MonitoringStub extends ZedRequestStub implements MonitoringStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface|void
     */
    public function getDBVersion(MonitoringTransfer $monitoringTransfer)
    {
        try {
            return $this->zedStub->call(
                '/monitoring-report/gateway/get-db-version',
                $monitoringTransfer
            );
        } catch (Exception $exception) {
            http_response_code(404);
            die();
        }
    }

    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface|void
     */
    public function getRedisKeys(MonitoringTransfer $monitoringTransfer)
    {
        try {
            return $this->zedStub->call(
                '/monitoring-report/gateway/get-redis-keys',
                $monitoringTransfer
            );
        } catch (Exception $exception) {
            http_response_code(404);
            die();
        }
    }

    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface|void
     */
    public function getMonitoringResponse(MonitoringTransfer $monitoringTransfer)
    {
        try {
            return $this->zedStub->call(
                '/monitoring-report/gateway/get-monitoring-report-transfer',
                $monitoringTransfer
            );
        } catch (Exception $exception) {
            http_response_code(404);
            die();
        }
    }
}
