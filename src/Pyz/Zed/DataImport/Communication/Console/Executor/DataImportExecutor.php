<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console\Executor;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportMessageTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\DataImport\Communication\Console\Executor\DataImportExecutor as SprykerDataImportExecutor;
use Symfony\Component\Console\Input\InputInterface;

class DataImportExecutor extends SprykerDataImportExecutor
{
    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param string $configPath
     * @param string|null $importerType
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function executeByConfigAndImporterType(InputInterface $input, string $configPath, ?string $importerType): DataImporterReportTransfer
    {
        $dataImportConfigurationTransfer = $this->dataImportConfigurationParser->parseConfigurationFile($configPath);

        if ($this->isImporterTypeSpecified($importerType)) {
            $filteredDataImportConfigurationActionTransfers = $this->filterDataImportConfigurationActionTransfersByImporterType(
                $dataImportConfigurationTransfer->getActions(),
                $importerType
            );
            $dataImportConfigurationTransfer->setActions($filteredDataImportConfigurationActionTransfers);
        }

        $overallDataImporterReportTransfer = (new DataImporterReportTransfer())
            ->setIsSuccess(true)
            ->setImportedDataSetCount(0);

        if (!$dataImportConfigurationTransfer->getActions()->count()) {
            $messageTransfer = new DataImporterReportMessageTransfer();
            $messageTransfer->setMessage(sprintf('Requested import type "%s" was not found in %s.', $importerType, $configPath));

            return $overallDataImporterReportTransfer->addMessage($messageTransfer);
        }

        foreach ($dataImportConfigurationTransfer->getActions() as $dataImportConfigurationActionTransfer) {
            $dataImporterConfigurationTransfer = $this->buildDataImportConfiguration($input, $dataImportConfigurationActionTransfer->getDataEntity());
            if (!$dataImporterConfigurationTransfer->getReaderConfiguration()->getFileName()) {
                $dataImporterConfigurationTransfer->getReaderConfiguration()->setFileName($dataImportConfigurationActionTransfer->getSource());
            }

            $dataImporterReportTransfer = $this->dataImportFacade->importByAction($dataImportConfigurationActionTransfer, $dataImporterConfigurationTransfer);

            $overallDataImporterReportTransfer = $this->addDataImporterReportTransferToOverallReport($dataImporterReportTransfer, $overallDataImporterReportTransfer);
        }

        return $overallDataImporterReportTransfer;
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param string|null $importerType
     *
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    protected function buildDataImportConfiguration(InputInterface $input, ?string $importerType): DataImporterConfigurationTransfer
    {
        $dataImporterConfigurationTransfer = new DataImporterConfigurationTransfer();
        $dataImporterConfigurationTransfer
            ->setImportType($importerType)
            ->setImportGroup($input->getOption(DataImportConsole::OPTION_IMPORT_GROUP))
            ->setThrowException(false);

        if ($input->hasParameterOption('--' . DataImportConsole::OPTION_THROW_EXCEPTION) || $input->hasParameterOption('-' . DataImportConsole::OPTION_THROW_EXCEPTION_SHORT)) {
            $dataImporterConfigurationTransfer->setThrowException(true);
        }

        if ($input->hasParameterOption('--' . DataImportConsole::OPTION_SKIP_AFTER_IMPORT_HOOKS) || $input->hasParameterOption('-' . DataImportConsole::OPTION_SKIP_AFTER_IMPORT_HOOKS_SHORT)) {
            $dataImporterConfigurationTransfer->setAfterImportHooksToSkip($input->getOption(DataImportConsole::OPTION_SKIP_AFTER_IMPORT_HOOKS));
        }

        $dataImporterConfigurationTransfer->setReaderConfiguration($this->buildReaderConfiguration($input));

        return $dataImporterConfigurationTransfer;
    }
}
