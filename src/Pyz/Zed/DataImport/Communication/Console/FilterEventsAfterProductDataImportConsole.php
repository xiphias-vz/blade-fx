<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Exception;
use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class FilterEventsAfterProductDataImportConsole extends Console
{
    public const COMMAND_NAME = 'import:eventFilter';
    public const COMMAND_DESCRIPTION = 'Delete publish events after product data import is done';

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
        try {
            $sqlEventFilter = $this->fromSqlQueryEventFiltering();
            $filteredEvents = $this->getResult($sqlEventFilter);
        } catch (Exception $exception) {
            dump($exception);

            return self::CODE_ERROR;
        }

        return self::CODE_SUCCESS;
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
    }

    /**
     * @return string
     */
    public function fromSqlQueryEventFiltering()
    {
        return "call pyzx_event_filtering()";
    }
}
