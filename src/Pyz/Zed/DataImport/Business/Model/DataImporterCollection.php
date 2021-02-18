<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Propel\Runtime\Propel;
use ReflectionClass;
use Spryker\Zed\DataImport\Business\Model\DataImporterCollection as SprykerDataImporterCollection;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Product\Dependency\ProductEvents;

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

            if ($importType == "product") {
                $this->updateProductActivity();
            }

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

    /**
     * @return void
     */
    protected function updateProductActivity()
    {
        $con = Propel::getConnection();
        $statement = $con->prepare('SELECT last_import_at
            FROM spy_product sp
            WHERE last_import_at > DATE_ADD(now(), interval -2 HOUR)
            GROUP BY last_import_at
            ORDER BY last_import_at DESC
            LIMIT 2');
        $statement->execute();
        $result = $statement->fetchAll();
        $filter = [];
        foreach ($result as $d) {
            array_push($filter, "'" . $d[0] . "'");
        }
        if (count($filter) > 0) {
            $statement = $con->prepare('select id_product from spy_product where is_active = 1 and (not last_import_at in(' . implode(',', $filter) . ') or last_import_at is null)');
            $statement->execute();
            $result = $statement->fetchAll();
            $filterId = [];
            foreach ($result as $id) {
                DataImporterPublisher::addEvent(ProductEvents::PRODUCT_ABSTRACT_UNPUBLISH, $id[0]);
                DataImporterPublisher::addEvent(ProductEvents::PRODUCT_CONCRETE_UNPUBLISH, $id[0]);
                array_push($filterId, $id[0]);
            }
            if (count($filterId) > 0) {
                $statement = $con->prepare('update spy_product set is_active = 0 where id_product in(' . implode(',', $filterId) . ')');
                $statement->execute();
            }
        }
    }
}
