<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Zed\RabbitMq\Business\RabbitMqFacadeInterface getFacade()
 */
class InitVirtualHostConsole extends Console
{
    public const COMMAND_NAME = 'rabbitmq:virtual-hosts:init';
    public const DESCRIPTION = 'This command will init RabbitMq virtual hosts.';

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::DESCRIPTION);

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
        $responseStatusCode = $this->getFacade()->initVirtualHost();

        if ($responseStatusCode >= Response::HTTP_OK && $responseStatusCode <= Response::HTTP_MULTIPLE_CHOICES) {
            return static::CODE_SUCCESS;
        }

        return static::CODE_ERROR;
    }
}
