<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\DataImportStep;

use DateTime;
use Orm\Zed\DataImport\Persistence\PyzDataImportEvent;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep as SpryPublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;

/**
 * @SuppressWarnings(PHPMD.NumberOfChildren)
 */
class PublishAwareStep extends SpryPublishAwareStep
{
    /**
     * @var array
     */
    protected $entityEvents = [];

    /**
     * @return void
     */
    public function afterExecute()
    {
        foreach ($this->entityEvents as $eventName => $ids) {
            foreach ($ids as $id) {
                DataImporterPublisher::addEvent($eventName, $id);
            }
        }
        $this->entityEvents = [];
    }

    /**
     * @param string $eventName
     * @param int $entityId
     *
     * @return void
     */
    public function addPublishEvents($eventName, $entityId)
    {
        $eventData = new PyzDataImportEvent();
        $eventData
            ->setEntityId($entityId)
            ->setEventName($eventName)
            ->setCreatedAt((new DateTime())->getTimestamp());
        $eventData->save();
    }
}
