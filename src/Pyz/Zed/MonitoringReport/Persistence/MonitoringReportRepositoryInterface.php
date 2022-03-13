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

interface MonitoringReportRepositoryInterface
{
    /**
     * @return \Propel\Runtime\Connection\ConnectionInterface
     */
    public function createPropelConnection(): ConnectionInterface;

    /**
     * @return \Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery
     */
    public function getPyzMonitoringJobsQuery(): PyzMonitoringJobsQuery;

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function getSpyStoresQuery(): SpyStoreQuery;

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function getSpyMerchantQuery(): SpyMerchantQuery;

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchant[]|\Propel\Runtime\Collection\ObjectCollection
     */
    public function getActiveMerchants();

    /**
     * @param string $senderJobDescription
     * @param string $sendToEmail
     * @param string $subject
     * @param string $body
     *
     * @return void
     */
    public function setEmailToSend(string $senderJobDescription, string $sendToEmail, string $subject, string $body);
}
