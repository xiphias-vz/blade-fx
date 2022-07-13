<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\APIEndpointStatus\Communication\Console;

use Exception;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\APIEndpointStatus\Communication\APIEndpointStatusCommunicationFactory getFactory()
 * @method \Pyz\Zed\APIEndpointStatus\Persistence\APIEndpointStatusRepositoryInterface getRepository()
 */
class APIEndpointStatusConsole extends Console
{
    public const COMMAND_NAME = 'check-api-endpoint-status';
    public const COMMAND_DESCRIPTION = 'Check status of API endpoints';

    /**
     * @return void
     */
    public function configure()
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
            $this->getFactory()->createAPIEndpointStatusPlugin()->sendApiEndpointStatusMail();
        } catch (Exception $e) {
            dump($e);

            return static::CODE_ERROR;
        }

        return static::CODE_SUCCESS;
    }
}
