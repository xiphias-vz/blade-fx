<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ZeroPricesReportMail\Communication\Console;

use Exception;
use Pyz\Zed\ZeroPricesReportMail\Communication\Plugin\Mail\ZeroPricesReportMailTypePlugin;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\ZeroPricesReportMail\Business\ZeroPricesReportMailFacadeInterface getFacade()
 */
class ZeroPricesReportMailConsole extends Console
{
    public const COMMAND_NAME = 'report:zero_prices:mail';
    public const COMMAND_DESCRIPTION = 'Send report with info about zero prices after import via mail';

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
            $mailPlugin = new ZeroPricesReportMailTypePlugin();

            $mailPlugin->sendMail();

            return self::CODE_SUCCESS;
        } catch (Exception $e) {
            return self::CODE_ERROR;
        }
    }
}
