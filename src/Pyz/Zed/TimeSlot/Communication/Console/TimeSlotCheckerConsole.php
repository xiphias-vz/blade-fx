<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication\Console;

use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface getFacade()
 * @method \Pyz\Zed\TimeSlot\Communication\TimeSlotCommunicationFactory getFactory()
 */
class TimeSlotCheckerConsole extends Console
{
    public const COMMAND_NAME = 'timeslot:check'; // e.g. 'catalog:import'
    public const COMMAND_DESCRIPTION = 'Check and update time slots';
    public const OPTION_EXEC_MERCHANT_LIST = 'merchant_list';
    public const OPTION_EXEC_MERCHANT_LIST_SHORT = 'm';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        $this->addOption(static::OPTION_EXEC_MERCHANT_LIST, static::OPTION_EXEC_MERCHANT_LIST_SHORT, InputOption::VALUE_OPTIONAL, 'Execute merchant list synchronization.');

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
        $data = PropelExtension::getResultAssoc("call pyzx_get_timeslot_capacity()");
        if (count($data) > 0) {
            $client = $this->getFactory()->getStorageClient();
            foreach ($data as $item) {
                $key = $item["key_name"];
                $ordersCount = (int)$item["ordersCount"];
                $val = $client->get($key);
                if ($val === null || $val !== $ordersCount) {
                    $client->set($key, $ordersCount);
                    $output->writeln(sprintf('%s updated %d => %d', $key, $val, $ordersCount));
                }
            }
            if ($input->hasParameterOption('--' . static::OPTION_EXEC_MERCHANT_LIST) || $input->hasParameterOption('-' . static::OPTION_EXEC_MERCHANT_LIST_SHORT)) {
                $this->getFactory()->getTimeSlotsFacade()->executeEvent(['merchants_list']);
            }
        }
        $output->writeln(sprintf('Timeslot check executed! Checked %d keys.', count($data)));

        return static::CODE_SUCCESS;
    }
}
