<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Plugin\ExecEvents;

use DateTime;
use Exception;
use Generated\Shared\Transfer\AvailabilityNotificationDataTransfer;
use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\DataImport\Persistence\Map\PyzDataImportEventTableMap;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventArchive;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventQuery;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportInterface;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Kernel\Locator;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class ExecEventsPlugin extends AbstractPlugin
{
    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface|null
     */
    protected static $eventFacade;

    /**
     * @var int
     */
    protected $eventBulkCounter = 0;

    /**
     * @var array
     */
    protected $eventBulk = [];


    /**
     * @param \Symfony\Component\Console\Output\OutputInterface|null $output
     *
     * @return int
     */
    public function execEvents(?OutputInterface $output = null): int
    {
        $con = Propel::getConnection();
        $con->beginTransaction();
        try {
                $counter = 0;
                DataImporterPublisher::triggerEvents();
                $qry = new PyzDataImportEventQuery();
                $qry->groupBy([PyzDataImportEventTableMap::COL_EVENT_NAME, PyzDataImportEventTableMap::COL_ENTITY_ID, PyzDataImportEventTableMap::COL_EVENT_DATA]);
                $qry->withColumn('GROUP_CONCAT(' . PyzDataImportEventTableMap::COL_ID_DATA_IMPORT_EVENT . ')', 'itemIdList');
                $data = $qry->find();

                foreach ($data as $event) {
                    $counter++;
                    if ($event->getClassName() == 'AvailabilityNotificationDataTransfer') {
                        $ev = new AvailabilityNotificationDataTransfer();
                        $ev->unserialize($event->getEventData());
                        $this->addToEventBulk($event->getEventName(), $ev);
                    } elseif ($event->getClassName() == 'EventEntityTransfer') {
                        $ev = new EventEntityTransfer();
                        $ev->unserialize($event->getEventData());
                        $this->addToEventBulk($event->getEventName(), $ev);
                    } else {
                        DataImporterPublisher::addEvent($event->getEventName(), $event->getEntityId());
                    }
                    if ($counter % DataImporterPublisher::DEFAULT_CHUNK_SIZE == 0) {
                        $con->commit();
                        $con->beginTransaction();
                    }
                    $eventArchive = new PyzDataImportEventArchive();
                    $eventArchive->setIdDataImportEvent($event->getIdDataImportEvent())
                        ->setEventName($event->getEventName())
                        ->setEntityId($event->getEntityId())
                        ->setClassName($event->getClassName())
                        ->setEventData($event->getEventData())
                        ->setCreatedAt($event->getCreatedAt())
                        ->setExecutedAt((new DateTime())->getTimestamp());
                    $eventArchive->save($con);
                    $idList = $event->getVirtualColumn('itemIdList');
                    $event->delete($con);
                    if (str_contains($idList, ',')) {
                        PropelExtension::execute("delete from " . PyzDataImportEventTableMap::TABLE_NAME . " where " . PyzDataImportEventTableMap::COL_ID_DATA_IMPORT_EVENT . " in (" . $idList . ")", $con);
                    }
                    if ($counter % 1000 == 0 && $output !== null) {
                        $output->writeln("published " . $counter . " events");
                    }
                }
                DataImporterPublisher::triggerEvents();
                $this->publishEvents(true);
                $con->commit();
                if($output !== null) $output->writeln("Totally generated " . $counter . " events");

            return Console::CODE_SUCCESS;
        } catch (Exception $ex) {
            $con->rollBack();
            if($output !== null) $output->writeln($ex->getMessage());
        }

        return Console::CODE_ERROR;
    }

    /**
     * @param string $eventName
     * @param mixed $event
     *
     * @return void
     */
    public function addToEventBulk(string $eventName, $event)
    {
        $this->eventBulkCounter++;
        $this->eventBulk[$eventName][] = $event;
        $this->publishEvents();
    }

    /**
     * @param bool $force
     *
     * @return void
     */
    protected function publishEvents(bool $force = false): void
    {
        if ($this->eventBulkCounter >= DataImporterPublisher::DEFAULT_CHUNK_SIZE || $force) {
            foreach (array_keys($this->eventBulk) as $key) {
                $this->loadEventFacade();
                static::$eventFacade->triggerBulk($key, $this->eventBulk[$key]);
            }
            $this->eventBulkCounter = 0;
            $this->eventBulk = [];
        }
    }


    /**
     * Added here for keeping the BC, needs to inject this from outside
     *
     * @return void
     */
    protected function loadEventFacade()
    {
        if (!static::$eventFacade) {
            $locatorClassName = Locator::class;
            static::$eventFacade = $locatorClassName::getInstance()->event()->facade();
        }
    }

}
