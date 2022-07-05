<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\SalesOrderSummaryExport\Business\SalesOrderSummaryExportFacadeInterface getFacade()
 * @method \Pyz\Zed\SalesOrderSummaryExport\Communication\SalesOrderSummaryExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportRepositoryInterface getRepository()
 */
class SalesOrderSummaryExportConsole extends Console
{
    public const COMMAND_NAME = 'data:exportSalesOrderSummary'; // e.g. 'catalog:import'
    public const COMMAND_DESCRIPTION = 'Export sales order Summary';

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
        $output->writeln(static::COMMAND_NAME . " executed");
        $data = $this->getFactory()->createRepository()->getCustomOrderItemData();
        $output->writeln("generated CSV");
        $this->getFacade()->exportOrders($data->getContent());
        $output->writeln("CSV exported to FTP");

        return null;
    }
}
