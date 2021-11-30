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
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportUpdateStockConsole extends Console
{
    public const COMMAND_NAME = 'import:updateStock';
    public const COMMAND_DESCRIPTION = 'Update product stock per store from pyz_imp_stock';

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
            $sql = "call pyzx_import_stock;";
            $this->execCommand($sql, $con);

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
