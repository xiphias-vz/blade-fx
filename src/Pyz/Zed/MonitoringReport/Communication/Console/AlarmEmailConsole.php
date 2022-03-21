<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Console;

use Orm\Zed\MonitoringReport\Persistence\PyzEmailSendQuery;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Mail\AlarmEmailMailTypePlugin;
use Spryker\Shared\Config\Config;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 */
class AlarmEmailConsole extends Console
{
    public const COMMAND_NAME = 'monitor:alarm-email';
    public const COMMAND_DESCRIPTION = 'Send email alarm that there are errors in the shop';

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
            $this->sentReportMail();
            $heartbeat = Config::get(MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT);
            if ($heartbeat != '') {
                $this->getFactory()->createHeartBeat()->getHeartbeat($heartbeat);
            }

            return self::CODE_SUCCESS;
        } catch (Exception $exception) {
            return self::CODE_ERROR;
        }
    }

    /**
     * @return int
     */
    protected function sentReportMail(): int
    {
        try {
            $mailPlugin = new AlarmEmailMailTypePlugin();
            $mailPlugin->sendMail();

            return self::CODE_SUCCESS;
        } catch (Exception $exception) {
            return self::CODE_ERROR;
        }
    }

    /**
     * @return array
     */
    protected function getEmailsForSending(): array
    {
        $result = PyzEmailSendQuery::create()
            ->filterBySentAt(null)
            ->find();
        if ($result != null) {
            return $result->getData();
        }

        return [];
    }
}
