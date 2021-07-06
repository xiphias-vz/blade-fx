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
     * @var array
     */
    public static $importCounters;

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
            static::$importCounters[$importType] = 0;
            Propel::disableInstancePooling();

            $this->executeDataImporter(
                $dataImporters[$importType],
                $dataImporterReportTransfer,
                $dataImporterConfigurationTransfer
            );

            if ($importType == "product") {
                $this->updateProductActivity();
                $this->insertDataToAssortmentZoneTable();
                $this->mapAssortmentZoneWithPickZoneAndMerchant();
            }

            if ($importType == "time-slot") {
                $this->deleteDuplicatedRows();
            }
            Propel::enableInstancePooling();

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
    protected function insertDataToAssortmentZoneTable()
    {
        $con = Propel::getConnection();
        $statement = $con->prepare('INSERT INTO pyz_assortment_zone (assortment_zone)
                    SELECT distinct sp.assortment_zone
                    FROM spy_product sp
                    LEFT OUTER JOIN pyz_assortment_zone paz on paz.assortment_zone = sp.assortment_zone
                    WHERE paz.id_assortment_zone is null and not sp.assortment_zone is null ');
        $statement->execute();
    }

    /**
     * @return void
     */
    protected function mapAssortmentZoneWithPickZoneAndMerchant()
    {
        $con = Propel::getConnection();
        $statement = $con->prepare('INSERT INTO pyz_assortment_pick_zone_relation (fk_assortment_zone, fk_merchant, fk_picking_zone)
                    SELECT allAsortmentZonesPerMerchant.*
                        , def_picking_zone.id_picking_zone
                    FROM (
                    SELECT paz.id_assortment_zone, sm.id_merchant
                    FROM pyz_assortment_zone paz
                    CROSS JOIN spy_merchant sm
                    )  allAsortmentZonesPerMerchant
                    LEFT OUTER JOIN pyz_assortment_pick_zone_relation papzr on papzr.fk_merchant = allAsortmentZonesPerMerchant.id_merchant
                    AND papzr.fk_assortment_zone = allAsortmentZonesPerMerchant.id_assortment_zone
                    CROSS JOIN (SELECT id_picking_zone FROM pyz_picking_zone ORDER BY is_default DESC, id_picking_zone DESC LIMIT 1) def_picking_zone
                    WHERE papzr.id_assortment_pick_zone_relation is null');
        $statement->execute();
    }

    /**
     * @return void
     */
    protected function updateProductActivity()
    {
        $con = Propel::getConnection();
        $statement = $con->prepare('SELECT MAX(last_import_at) AS last_import_at
            FROM spy_product sp
            WHERE NOT file_type IS NULL
            GROUP BY file_type');
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

    /**
     * @return void
     */
    protected function deleteDuplicatedRows()
    {
        $con = Propel::getConnection();
        $statement = $con->prepare("DELETE b
            FROM
             (
                SELECT id_time_slot, merchant_reference, day, date, time_slot
                , ROW_NUMBER() OVER(PARTITION BY merchant_reference, day, date, time_slot order by id_time_slot desc) as rn
                FROM pyz_time_slot pts WHERE day <>''
             ) a
            INNER JOIN pyz_time_slot b on b.id_time_slot = a.id_time_slot
            WHERE a.rn > 1");
        $statement->execute();
    }
}
