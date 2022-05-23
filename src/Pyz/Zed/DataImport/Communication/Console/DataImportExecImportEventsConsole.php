<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Exception;
use Orm\Zed\DataImport\Persistence\Map\PyzDataImportEventTableMap;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\Console\Console;
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
        try {
            if ($input->hasParameterOption('--' . static::OPTION_DELETE_EVENTS) || $input->hasParameterOption('-' . static::OPTION_DELETE_EVENTS_SHORT)) {
                PropelExtension::execute("delete from " . PyzDataImportEventTableMap::TABLE_NAME);
                $output->writeln("Events deleted from pyz_data_import_event table");
            } else {
                if ($input->hasParameterOption('--' . static::OPTION_EXEC_EVENT_FROM_ARCHIVE) || $input->hasParameterOption('-' . static::OPTION_EXEC_EVENT_FROM_ARCHIVE_SHORT)) {
                    $eventName = $input->getOption(static::OPTION_EXEC_EVENT_FROM_ARCHIVE);
                    $this->copyEventData($eventName);
                }

                return $this->getFactory()->getExecEventsPlugin()->execEvents($output);
            }

            return Console::CODE_SUCCESS;
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return Console::CODE_ERROR;
    }

    /**
     * @param string $eventName
     *
     * @return void
     */
    protected function copyEventData(string $eventName): void
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
        PropelExtension::execute($qry);
    }
}
