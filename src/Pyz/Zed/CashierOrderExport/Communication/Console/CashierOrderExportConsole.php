<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacade getFacade()
 * @method \Pyz\Zed\CashierOrderExport\Communication\CashierOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface getRepository()
 */
class CashierOrderExportConsole extends Console
{
    protected const COMMAND_NAME = 'cashierOrder:export';
    protected const COMMAND_DESCRIPTION = 'Commmand for export order to cashier file.';
    public const OPTION_ORDER_ID = 'ord';
    public const OPTION_ORDER_ID_SHORT = 'o';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        $this->addOption(self::OPTION_ORDER_ID, self::OPTION_ORDER_ID_SHORT, InputOption::VALUE_REQUIRED);
        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $orderId = $this->getOptionValue($input, self::OPTION_ORDER_ID, self::OPTION_ORDER_ID_SHORT, '');
        $orderTransfer = $this->getFactory()
            ->getSalesFacade()
            ->getOrderByIdSalesOrder($orderId);
        if ($orderTransfer->getIsCashierExportSuccess()) {
            $this->info('Nothing to do, order cashier file already generated', true);
        } else {
            $emptiedDirectories = $this->getFacade()->exportOrders($orderTransfer);
            $this->info('Order exported', true);
        }

        return 0;
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param string $option
     * @param string $optionShort
     * @param mixed $defValue
     *
     * @return bool|string|string[]|null
     */
    private function getOptionValue(InputInterface $input, string $option, string $optionShort, $defValue)
    {
        $val = $defValue;
        if ($input->hasParameterOption('-' . $option) || $input->hasParameterOption('-' . $optionShort)) {
            $val = $input->getOption($option);
        }

        return $val;
    }
}
