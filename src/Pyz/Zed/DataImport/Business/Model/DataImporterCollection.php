<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use ReflectionClass;
use Spryker\Zed\DataImport\Business\Model\DataImporterCollection as SprykerDataImporterCollection;

class DataImporterCollection extends SprykerDataImporterCollection
{
    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null)
    {
        $importType = $this->getCurrentImportType($dataImporterConfigurationTransfer);
        $dataImporterReportTransfer = $this->prepareDataImporterReport($importType);
        $dataImporters = $this->getDataImportersByImportGroup($dataImporterConfigurationTransfer);

        $this->beforeImport();

        if ($importType !== $this->getImportType()) {
            $this->executeDataImporter(
                $dataImporters[$importType],
                $dataImporterReportTransfer,
                $dataImporterConfigurationTransfer
            );

            if (!empty($dataImporterConfigurationTransfer->getAfterImportHooksToSkip())) {
                foreach ($this->afterImportHooks as $afterImportHook) {
                    $afterImportHookName = (new ReflectionClass($afterImportHook))->getShortName();

                    if (in_array($afterImportHookName, $dataImporterConfigurationTransfer->getAfterImportHooksToSkip())) {
                        continue;
                    }
                    $afterImportHook->afterImport();
                }

                return $dataImporterReportTransfer;
            }

            $this->afterImport();

            return $dataImporterReportTransfer;
        }

        $this->runDataImporters($dataImporters, $dataImporterReportTransfer, $dataImporterConfigurationTransfer);

        $this->afterImport();

        return $dataImporterReportTransfer;
    }
}
