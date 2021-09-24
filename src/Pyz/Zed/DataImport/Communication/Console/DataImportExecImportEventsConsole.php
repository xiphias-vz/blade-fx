<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use DateTime;
use Exception;
use Generated\Shared\Transfer\AvailabilityNotificationDataTransfer;
use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\DataImport\Persistence\Map\PyzDataImportEventTableMap;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventArchive;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Kernel\Locator;
use Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportExecImportEventsConsole extends Console
{
    public const COMMAND_NAME = 'import:execEvents';
    public const COMMAND_DESCRIPTION = 'Exec Rabbit MQ events from pyz_data_import_event';
    public const OPTION_DELETE_EVENTS = 'delete-events';
    public const OPTION_DELETE_EVENTS_SHORT = 'd';
    public const OPTION_EXEC_EVENT_FROM_ARCHIVE = 'archive-event';
    public const OPTION_EXEC_EVENT_FROM_ARCHIVE_SHORT = 'a';

    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface|null
     */
    protected static $eventFacade;

    /**
     * @var array
     */
    protected $eventBulk = [];

    /**
     * @var int
     */
    protected $eventBulkCounter = 0;

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
        $this->addOption(static::OPTION_DELETE_EVENTS, static::OPTION_DELETE_EVENTS_SHORT, InputOption::VALUE_OPTIONAL, 'Clear all events from DB pyz_data_import_event.');
        $this->addOption(static::OPTION_EXEC_EVENT_FROM_ARCHIVE, static::OPTION_EXEC_EVENT_FROM_ARCHIVE_SHORT, InputOption::VALUE_OPTIONAL, 'Copy events from archive and execute events.');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $con = Propel::getConnection();
        $con->beginTransaction();
        try {
            if ($input->hasParameterOption('--' . static::OPTION_DELETE_EVENTS) || $input->hasParameterOption('-' . static::OPTION_DELETE_EVENTS_SHORT)) {
                $this->execCommand("delete from " . PyzDataImportEventTableMap::TABLE_NAME, $con);
                $output->writeln("Events deleted from pyz_data_import_event table");
                $con->commit();
            } else {
                if ($input->hasParameterOption('--' . static::OPTION_EXEC_EVENT_FROM_ARCHIVE) || $input->hasParameterOption('-' . static::OPTION_EXEC_EVENT_FROM_ARCHIVE_SHORT)) {
                    $eventName = $input->getOption(static::OPTION_EXEC_EVENT_FROM_ARCHIVE);
                    $this->copyEventData($eventName, $con);
                    $con->commit();
                    $con->beginTransaction();
                }

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
                    $eventArcive = new PyzDataImportEventArchive();
                    $eventArcive->setIdDataImportEvent($event->getIdDataImportEvent())
                        ->setEventName($event->getEventName())
                        ->setEntityId($event->getEntityId())
                        ->setClassName($event->getClassName())
                        ->setEventData($event->getEventData())
                        ->setCreatedAt($event->getCreatedAt())
                        ->setExecutedAt((new DateTime())->getTimestamp());
                    $eventArcive->save();
                    $idList = $event->getVirtualColumn('itemIdList');
                    $event->delete();
                    if (str_contains($idList, ',')) {
                        $this->execCommand("delete from " . PyzDataImportEventTableMap::TABLE_NAME . " where " . PyzDataImportEventTableMap::COL_ID_DATA_IMPORT_EVENT . " in (" . $idList . ")", $con);
                    }
                    if ($counter % 1000 == 0) {
                        $output->writeln("published " . $counter . " events");
                    }
                }
                DataImporterPublisher::triggerEvents();
                $this->publishEvents(true);
                $con->commit();
                $output->writeln("Totally generated " . $counter . " events");
            }

            return Console::CODE_SUCCESS;
        } catch (Exception $ex) {
            $con->rollBack();
            $output->writeln($ex->getMessage());
        }

        return Console::CODE_ERROR;
    }

    /**
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     *
     * @return bool
     */
    private function execCommand(string $sql, ConnectionInterface $connection): bool
    {
        $statement = $connection->prepare($sql);
        $statement->execute();

        return true;
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
     * @param string $eventName
     * @param \Propel\Runtime\Connection\ConnectionInterface $con
     *
     * @return void
     */
    protected function copyEventData(string $eventName, ConnectionInterface $con): void
    {
        $qry = "select  @date := max(executed_at)
                        from pyz_data_import_event_archive
                        where event_name like '" . $eventName . "';

                        insert into pyz_data_import_event
                            (entity_id, event_name, class_name, event_data, created_at)
                        select  entity_id, event_name, class_name, event_data, max(created_at)
                        from pyz_data_import_event_archive
                        where event_name like '" . $eventName . "'
                            and executed_at between DATE_SUB(@date, INTERVAL 10 MINUTE)
                                and DATE_ADD(@date, INTERVAL 1 MINUTE)
                        group by entity_id, event_name, class_name, event_data";
        $this->execCommand($qry, $con);
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

    /**
     * @return \Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper
     */
    public function createStoreMapper(): StoreMapper
    {
        return new StoreMapper();
    }

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function getStoreQuery(): SpyStoreQuery
    {
        return new SpyStoreQuery();
    }
}
