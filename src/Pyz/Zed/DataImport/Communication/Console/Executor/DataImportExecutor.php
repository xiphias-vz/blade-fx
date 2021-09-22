<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console\Executor;

use Generated\Shared\Transfer\DataImporterReportMessageTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
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
}
