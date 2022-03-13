<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Persistence;

use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Propel\Runtime\Connection\ConnectionInterface;

interface MonitoringReportPersistenceInterface
{
    /**
     * @return \Propel\Runtime\Connection\ConnectionInterface
     */
    public function createPropelConnection(): ConnectionInterface;

    /**
     * @return \Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery
     */
    public function createPyzMonitoringJobsQuery(): PyzMonitoringJobsQuery;

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function createSpyStoresQuery(): SpyStoreQuery;

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function createSpyMerchantQuery(): SpyMerchantQuery;
}
