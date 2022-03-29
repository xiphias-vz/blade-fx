<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Console;

use Exception;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 */
class JenkinsCheckUrlConsole extends Console
{
    public const COMMAND_NAME = 'monitor:check-jenkins-url';
    public const COMMAND_DESCRIPTION = 'Check url from jenkins jobs';

    public const OPTION_URL = "url";
    public const OPTION_URL_SHORT = "u";

    /**
     * @return void
     */
    protected function configure()
    {
        $this
            ->setName(static::COMMAND_NAME)
            ->setDescription(static::COMMAND_DESCRIPTION);

        $this->addOption(static::OPTION_URL, static::OPTION_URL_SHORT, InputOption::VALUE_REQUIRED, 'full url to prove access, ex:http//google.com');

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
        try {
            $url = $input->getOption(static::OPTION_URL);
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $resp = curl_exec($curl);
            curl_close($curl);
            if ($resp === false) {
                $output->writeln($url . " =>  NOT EXISTS!");
            } else {
                $output->writeln($url . " => " . $resp);
            }

            return $resp === false ? self::CODE_ERROR : self::CODE_SUCCESS;
        } catch (Exception $exception) {
            $output->writeln($exception->getMessage());

            return self::CODE_ERROR;
        }
    }
}
