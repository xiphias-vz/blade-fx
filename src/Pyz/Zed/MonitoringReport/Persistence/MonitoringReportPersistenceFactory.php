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
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class MonitoringReportPersistenceFactory extends AbstractPersistenceFactory implements MonitoringReportPersistenceInterface
{
    /**
     * @return \Propel\Runtime\Connection\ConnectionInterface
     */
    public function createPropelConnection(): ConnectionInterface
    {
        return Propel::getConnection();
    }

    /**
     * @return \Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery
     */
    public function createPyzMonitoringJobsQuery(): PyzMonitoringJobsQuery
    {
        return new PyzMonitoringJobsQuery();
    }

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function createSpyStoresQuery(): SpyStoreQuery
    {
        return new SpyStoreQuery();
    }

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function createSpyMerchantQuery(): SpyMerchantQuery
    {
        return new SpyMerchantQuery();
    }
}
