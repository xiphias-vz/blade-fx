<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 */
class JenkinsCheckConsole extends Console
{
    public const COMMAND_NAME = 'monitor:check-jenkins';
    public const COMMAND_DESCRIPTION = 'Check jenkins jobs';

//    public const PROCESS_ID = 'process-id';
//    public const PROCESS_ID_SHORTCUT = 'P';

    /**
     * @return void
     */
    protected function configure()
    {
        $this
            ->setName(static::COMMAND_NAME)
            ->setDescription(static::COMMAND_DESCRIPTION);

        //addOption(static::PROCESS_ID, static::PROCESS_ID_SHORTCUT, InputArgument::OPTIONAL, 'by given the process id, command only takes the order-items with this id, default will take all');

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
        $result = $this->getFactory()->createJenkinsHandlerPlugin()->checkAllJobs();
        foreach ($result as $key => $res) {
            $output->writeln("job: " . $key
                . ' lastSuccess: ' . ($res['lastSuccess'] ? $res['lastSuccess']->format('Y-m-d H:i:s') : '')
                . ' lastFailure: ' . ($res['lastFailure'] ? $res['lastFailure']->format('Y-m-d H:i:s') : '')
                . ' check: ' . $res['check']
                . ' error: ' . $res['error']);
        }

        return self::CODE_SUCCESS;
    }
}
