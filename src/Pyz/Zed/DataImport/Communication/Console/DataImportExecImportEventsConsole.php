<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use DateTime;
use Exception;
use Orm\Zed\DataImport\Persistence\Map\PyzDataImportEventTableMap;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventArchive;
use Orm\Zed\DataImport\Persistence\PyzDataImportEventQuery;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 */
class DataImportExecImportEventsConsole extends Console
{
    public const COMMAND_NAME = 'import:execEvents';
    public const COMMAND_DESCRIPTION = 'Exec Rabbit MQ events from pyz_data_import_event';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
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
            $counter = 0;
            DataImporterPublisher::triggerEvents();
            $qry = new PyzDataImportEventQuery();
            $qry->groupBy([PyzDataImportEventTableMap::COL_EVENT_NAME, PyzDataImportEventTableMap::COL_ENTITY_ID]);
            $qry->withColumn('GROUP_CONCAT(' . PyzDataImportEventTableMap::COL_ID_DATA_IMPORT_EVENT . ')', 'itemIdList');
            $data = $qry->find();

            foreach ($data as $event) {
                $counter++;
                DataImporterPublisher::addEvent($event->getEventName(), $event->getEntityId());
                if ($counter % DataImporterPublisher::DEFAULT_CHUNK_SIZE == 0) {
                    $con->commit();
                    $con->beginTransaction();
                }
                $eventArcive = new PyzDataImportEventArchive();
                $eventArcive->setIdDataImportEvent($event->getIdDataImportEvent())
                    ->setEventName($event->getEventName())
                    ->setEntityId($event->getEntityId())
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
            $con->commit();
            $output->writeln("Totally generated " . $counter . " events");

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
}