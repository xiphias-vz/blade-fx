<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Cache\Business\CacheFacadeInterface getFacade()
 */
class DirectoryCacheCleanerConsole extends Console
{
    protected const COMMAND_NAME = 'clear:directory:cache';
    protected const COMMAND_DESCRIPTION = 'Remove all contents from the specified directories.';

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
        $emptiedDirectories = $this->getFacade()->emptyDirectoriesCache();

        $this->info('Removed cache files', true);
        $this->printEmptiedDirectories($emptiedDirectories, $output);

        return 0;
    }

    /**
     * @param string[] $directories
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    protected function printEmptiedDirectories(array $directories, OutputInterface $output)
    {
        foreach ($directories as $directory) {
            $output->writeln($directory, OutputInterface::VERBOSITY_NORMAL);
        }
    }
}
