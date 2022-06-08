<?php

declare(strict_types = 1);

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Communication\Console;

use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class PriceProductScheduleConsole extends Console
{
    protected const COMMAND_NAME = 'scheduled-prices:apply';

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this
            ->setName(static::COMMAND_NAME)
            ->setDescription('Apply scheduled prices and generate events for publish. After execution execute "import:execEvents"!');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $result = PropelExtension::getResultNamed("call pyzx_product_price_schedule_apply()");

        if ($result) {
            $output->writeln($result[0]["result"]);

            return static::CODE_SUCCESS;
        }

        return static::CODE_ERROR;
    }
}
