<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportFileManagerConsole extends Console
{
    protected const DEFAULT_NAME = 'data:import:files-download';
    protected const DEFAULT_DESCRIPTION = 'Download files from SFTP server and stores them in data/import/spryker';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::DEFAULT_NAME)
            ->setDescription(static::DEFAULT_DESCRIPTION);
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->getFacade()->downloadDataImportFiles();

        return static::CODE_SUCCESS;
    }
}
