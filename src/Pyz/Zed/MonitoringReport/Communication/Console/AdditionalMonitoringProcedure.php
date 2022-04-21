<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Console;

use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 */
class AdditionalMonitoringProcedure extends Console
{
    public const COMMAND_NAME = 'monitor:exec-procedure';
    public const COMMAND_DESCRIPTION = 'Check additional stuff defined in the procedure';

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
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $procedure = $this->sqlProcedure();
            $this->getResult($procedure);

            return static::CODE_SUCCESS;
        } catch (Exception $ex) {
            dump($ex);

            return static::CODE_ERROR;
        }
    }

    /**
     * @return string
     */
    protected function sqlProcedure(): string
    {
        return "call pyzx_monitoring_procedure()";
    }

    /**
     * @param string $sql
     *
     * @return void
     */
    private function getResult(string $sql): void
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();
    }
}
