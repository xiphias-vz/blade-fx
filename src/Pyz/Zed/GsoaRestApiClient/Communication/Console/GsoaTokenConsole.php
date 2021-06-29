<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Communication\Console;

use Exception;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenScope;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class GsoaTokenConsole extends Console
{
    public const COMMAND_NAME = 'gsoa:tokenGet';
    public const COMMAND_DESCRIPTION = 'Retrive token from GSOA api';

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
        try {
            $client = new TokenProvider();
            $result = $client->getBearerToken([TokenScope::CUSTOMER_PROFILE, TokenScope::PRODUCT_CATALOG]);
            $output->writeln($result);

            return 1;
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return null;
    }
}