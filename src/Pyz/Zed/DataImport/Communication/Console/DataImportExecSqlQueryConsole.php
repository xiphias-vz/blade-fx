<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Exception;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportExecSqlQueryConsole extends Console
{
    public const COMMAND_NAME = 'import:execSqlQuery';
    public const COMMAND_DESCRIPTION = 'Execute sql query direct into database';
    public const OPTION_EXEC_QUERY = 'query';
    public const OPTION_EXEC_QUERY_SHORT = 's';

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
        $this->addOption(static::OPTION_EXEC_QUERY, static::OPTION_EXEC_QUERY_SHORT, InputOption::VALUE_OPTIONAL, 'Copy events from archive and execute events.');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        if ($input->hasParameterOption('--' . static::OPTION_EXEC_QUERY) || $input->hasParameterOption('-' . static::OPTION_EXEC_QUERY_SHORT)) {
            $query = $input->getOption(static::OPTION_EXEC_QUERY);
            $con = Propel::getConnection();
            try {
                $con->beginTransaction();
                $this->execCommand($query, $con);
                $output->writeln("Query executed: " . $query);
                $con->commit();

                return Console::CODE_SUCCESS;
            } catch (Exception $ex) {
                $con->rollBack();
                $output->writeln($ex->getMessage());
            }
        } else {
            $output->writeln("Enter sql command: -q 'Select * from spy_product' ");
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
