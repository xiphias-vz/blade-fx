<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Spryker\Zed\DataImport\Communication\Console\DataImportConsole as SprykerDataImportConsole;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;

/**
 * @method \Spryker\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Spryker\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportConsole extends SprykerDataImportConsole
{
    public const OPTION_SKIP_AFTER_IMPORT_HOOKS = 'skip-after-import-hooks';
    public const OPTION_SKIP_AFTER_IMPORT_HOOKS_SHORT = 'a';

    /**
     * @return void
     */
    protected function configure()
    {
        parent::configure();
        $this->addOption(static::OPTION_SKIP_AFTER_IMPORT_HOOKS, static::OPTION_SKIP_AFTER_IMPORT_HOOKS_SHORT, InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'Defines after import hook plugins to be skipped.');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     *
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    protected function buildDataImportConfiguration(InputInterface $input)
    {
        $dataImporterConfigurationTransfer = parent::buildDataImportConfiguration($input);

        if ($input->hasParameterOption('--' . static::OPTION_SKIP_AFTER_IMPORT_HOOKS) || $input->hasParameterOption('-' . static::OPTION_SKIP_AFTER_IMPORT_HOOKS_SHORT)) {
            $dataImporterConfigurationTransfer->setAfterImportHooksToSkip($input->getOption(static::OPTION_SKIP_AFTER_IMPORT_HOOKS));
        }

        return $dataImporterConfigurationTransfer;
    }
}
