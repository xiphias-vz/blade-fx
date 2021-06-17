<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Console;

use Spryker\Zed\Oms\Communication\Console\CheckTimeoutConsole as SprykerCheckTimeoutConsole;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class CheckTimeoutConsole extends SprykerCheckTimeoutConsole
{
    public const PROCESS_ID = 'process-id';
    public const PROCESS_ID_SHORTCUT = 'P';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->addOption(static::PROCESS_ID, static::PROCESS_ID_SHORTCUT, InputArgument::OPTIONAL, 'by given the process id, command only takes the order-items with this id, default will take all');

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $processId = null;
        if ($input->getOption(static::PROCESS_ID)) {
            $processId = (int)$input->getOption(static::PROCESS_ID);
        }

        $this->getFacade()->checkTimeouts([], $processId);

        return (int)null;
    }
}
