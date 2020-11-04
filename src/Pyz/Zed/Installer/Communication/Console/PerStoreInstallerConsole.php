<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Installer\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Process;

/**
 * @method \Pyz\Zed\Installer\Communication\InstallerCommunicationFactory getFactory()
 */
class PerStoreInstallerConsole extends Console
{
    public const COMMAND_NAME = 'install:per-store:run';
    public const DESCRIPTION = 'This command will be executed per store.';

    protected const ARGUMENT_COMMAND_TO_EXECUTE = 'commandName';
    protected const ARGUMENT_COMMAND_TO_EXECUTE_DESCRIPTION = 'Command to execute.';

    protected const DEFAULT_TIMEOUT_IN_SECONDS = 600;

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::DESCRIPTION);

        $this->addArgument(
            static::ARGUMENT_COMMAND_TO_EXECUTE,
            InputArgument::IS_ARRAY,
            static::ARGUMENT_COMMAND_TO_EXECUTE_DESCRIPTION
        );

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
        $commandToExecute = $input->getArgument(static::ARGUMENT_COMMAND_TO_EXECUTE);
        $activeStores = $this->getFactory()->getStore()->getAllowedStores();
        $storeSpecific = json_decode(getenv('SPRYKER_STORE_SPECIFIC') ?: '{}', true) ?: [];

        foreach ($activeStores as $store) {
            $env = $storeSpecific[$store] ?: [];
            $env['APPLICATION_STORE'] = $store;

            $process = $this->buildProcess($commandToExecute, $env);
            $process->start();

            foreach ($process as $buffer) {
                $output->writeln($buffer);
            }

            if (!$process->isSuccessful()) {
                return static::CODE_ERROR;
            }
        }

        return static::CODE_SUCCESS;
    }

    /**
     * @param string[] $command
     * @param array $env
     *
     * @return \Symfony\Component\Process\Process
     */
    protected function buildProcess(array $command, array $env)
    {
        $cwd = APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR;
        $env = array_replace(getenv(), $env);

        return Process::fromShellCommandline(implode(' ', $command), $cwd, $env, null, static::DEFAULT_TIMEOUT_IN_SECONDS);
    }
}
