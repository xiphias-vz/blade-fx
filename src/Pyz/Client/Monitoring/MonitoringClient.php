<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring;

use Generated\Shared\Transfer\MonitoringTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\Monitoring\MonitoringFactory getFactory()
 */
class MonitoringClient extends AbstractClient implements MonitoringClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getDBVersion(MonitoringTransfer $monitoringTransfer)
    {
        return $this->getFactory()
            ->createMonitoringStub()
            ->getDBVersion($monitoringTransfer);
    }

    /**
     * @param string $searchString
     *
     * @return mixed
     */
    public function getEsResult(string $searchString)
    {
        $searchQuery = $this
            ->getFactory()
            ->createCatalogSearchQuery($searchString);

        return $this
            ->getFactory()
            ->getSearchClient()
            ->search($searchQuery);
    }

    /**
     * @param string $searchString
     *
     * @return array
     */
    public function getFFResponse(string $searchString)
    {
        return $this->getFactory()->createFFCall($searchString);
    }
}
