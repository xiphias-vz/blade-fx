<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\APIEndpointStatus\Persistence;

use DateTime;
use Orm\Zed\MonitoringReport\Persistence\Map\PyzMonitorEmailDefinitionTableMap;
use Orm\Zed\MonitoringReport\Persistence\PyzEmailSend;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitorEmailDefinitionQuery;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

class APIEndpointStatusRepository extends AbstractRepository implements APIEndpointStatusRepositoryInterface
{
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
}
