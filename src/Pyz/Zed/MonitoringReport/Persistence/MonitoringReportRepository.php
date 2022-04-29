<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Persistence;

use DateTime;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\MonitoringReport\Persistence\Map\PyzMonitorEmailDefinitionTableMap;
use Orm\Zed\MonitoringReport\Persistence\PyzEmailSend;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategoriesQuery;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitorEmailDefinitionQuery;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitoringJobsQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportPersistenceFactory getFactory()
 */
class MonitoringReportRepository extends AbstractRepository implements MonitoringReportRepositoryInterface
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
    public function getPyzMonitoringJobsQuery(): PyzMonitoringJobsQuery
    {
        return $this->getFactory()->createPyzMonitoringJobsQuery();
    }

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function getSpyStoresQuery(): SpyStoreQuery
    {
        return $this->getFactory()->createSpyStoresQuery();
    }

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function getSpyMerchantQuery(): SpyMerchantQuery
    {
        return $this->getFactory()->createSpyMerchantQuery();
    }

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchant[]|\Propel\Runtime\Collection\ObjectCollection
     */
    public function getActiveMerchants()
    {
        return $this->getSpyMerchantQuery()->findByIsActive(true);
    }

    /**
     * @param string $senderJobDescription
     * @param string $sendToEmail
     * @param string $subject
     * @param string $body
     * @param bool|null $isHtml
     *
     * @return void
     */
    public function setEmailToSend(string $senderJobDescription, string $sendToEmail, string $subject, string $body, ?bool $isHtml = false)
    {
        $isHtml = $isHtml === null ? false : $isHtml;
        $entity = new PyzEmailSend();
        $entity->setSenderJobDescription($senderJobDescription)
            ->setSendToEmail($sendToEmail)
            ->setSubject($subject)
            ->setBodyDescription($body)
            ->setCreatedAt((new DateTime())->getTimestamp())
            ->setIsHtml($isHtml);
        $entity->save();
    }

    /**
     * @param string $roleName
     *
     * @return array
     */
    public function getEmailListForRoleName(string $roleName): array
    {
        return (new PyzMonitorEmailDefinitionQuery())
            ->select([PyzMonitorEmailDefinitionTableMap::COL_SEND_TO_EMAIL])
            ->findByRoleName($roleName)
            ->toArray();
    }

    /**
     * @return \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories[]|\Propel\Runtime\Collection\ObjectCollection
     */
    public function getCategoryMonitoringData()
    {
        $qry = new PyzMonitorCategoriesQuery();

        return $qry->find();
    }

    /**
     * @return array
     */
    public function getZeroPricesData(): array
    {
        $sql = "select pipp.store , pipp.sapnumber, pipp.gtin, pipp.price, pipp.pseudoprice, pipp.promotion, pipp.promotionstart, pipp.promotionend
                from pyz_imp_price_product pipp
                where dtImported > (select DATE_ADD(max(dtImported), INTERVAL -1 DAY) from pyz_imp_price_product)
                	and (price = 0 or (pseudoprice = 0 and promotionend > now()))
                order by pipp.store , pipp.sapnumber";

        return PropelExtension::getResultNamed($sql);
    }
}
