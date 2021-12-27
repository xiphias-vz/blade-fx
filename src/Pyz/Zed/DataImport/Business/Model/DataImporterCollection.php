<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Orm\Zed\Category\Persistence\Map\SpyCategoryNodeTableMap;
use Orm\Zed\Category\Persistence\Map\SpyCategoryTableMap;
use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationQuery;
use Propel\Runtime\Propel;
use Pyz\Zed\CategoryDataImport\Business\Model\CategoryWriterStep;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use ReflectionClass;
use Spryker\Zed\Category\Dependency\CategoryEvents;
use Spryker\Zed\DataImport\Business\Model\DataImporterCollection as SprykerDataImporterCollection;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Navigation\Dependency\NavigationEvents;
use Spryker\Zed\Product\Dependency\ProductEvents;

class DataImporterCollection extends SprykerDataImporterCollection
{
    /**
     * @var array
     */
    public static $importCounters;

    /**
     * @var string
     */
    public static $importDateTime;

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
        static::$importDateTime = date("Y-m-d h:i:sa");

        $this->beforeImport();

        if ($importType !== $this->getImportType()) {
            static::$importCounters[$importType] = 0;

            Propel::disableInstancePooling();

            if ($importType == "category") {
                $filePath = getcwd() . '/data/import/' . $dataImporterConfigurationTransfer->getReaderConfiguration()->getFileName();
                if (file_exists($filePath) && filesize($filePath) > 100) {
                    $this->deactivateAllNavigationNodes($this->resolveIdNavigation(CategoryWriterStep::NAVIGATION_MODE_DESKTOP));
                    $this->deactivateAllNavigationNodes($this->resolveIdNavigation(CategoryWriterStep::NAVIGATION_MODE_MOBILE));
                }
            }

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

            if ($importType == "category") {
                $this->updateCategoriesActivity();
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
        $statement = $con->prepare('
            select id_product, fk_product_abstract
            from spy_product
            where is_active = 1 and (not last_import_at in(
                SELECT MAX(last_import_at)
                FROM spy_product sp
                WHERE NOT file_type IS NULL
                GROUP BY file_type
            ) or last_import_at is null)');
        $statement->execute();
        $result = $statement->fetchAll();
        $filterId = [];
        foreach ($result as $id) {
            DataImporterPublisher::addEvent(ProductEvents::PRODUCT_ABSTRACT_UNPUBLISH, $id[1]);
            DataImporterPublisher::addEvent(ProductEvents::PRODUCT_CONCRETE_UNPUBLISH, $id[0]);
            array_push($filterId, $id[0]);
        }
        if (count($filterId) > 0) {
            $statement = $con->prepare('update spy_product set is_active = 0 where id_product in(' . implode(',', $filterId) . ')');
            $statement->execute();
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

    /**
     * @param int $idNavigation
     *
     * @return void
     */
    protected function deactivateAllNavigationNodes(int $idNavigation)
    {
        $con = Propel::getConnection();
        $statement = $con->prepare("update spy_navigation_node set is_active = 0 where fk_navigation = " . $idNavigation . " and node_type = 'category'");
        $statement->execute();
    }

    /**
     * @return void
     */
    protected function updateCategoriesActivity()
    {
        $categoriesToDeactivate = SpyCategoryQuery::create()
            ->withColumn(SpyCategoryNodeTableMap::COL_ID_CATEGORY_NODE, "id_category_node")
            ->leftJoinNode()
            ->where(SpyCategoryTableMap::COL_UPDATED_AT . ' <> (select max(sc.updated_at) from spy_category sc)')
            ->where(SpyCategoryTableMap::COL_IS_ACTIVE . ' = 1')
            ->find();
        if ($categoriesToDeactivate->count() > 0) {
            foreach ($categoriesToDeactivate as $category) {
                $category->setIsActive(false);
                $category->save();
                DataImporterPublisher::addEvent(CategoryEvents::CATEGORY_NODE_UNPUBLISH, $category->getVirtualColumn("id_category_node"));
            }
            DataImporterPublisher::triggerEvents();
            DataImporterPublisher::addEvent(NavigationEvents::NAVIGATION_KEY_PUBLISH, $this->resolveIdNavigation(CategoryWriterStep::NAVIGATION_MODE_DESKTOP));
            DataImporterPublisher::addEvent(NavigationEvents::NAVIGATION_KEY_PUBLISH, $this->resolveIdNavigation(CategoryWriterStep::NAVIGATION_MODE_MOBILE));
            DataImporterPublisher::triggerEvents();
        }
    }

    /**
     * @param string $navigationKey
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    public function resolveIdNavigation($navigationKey): int
    {
        $navigationEntity = SpyNavigationQuery::create()
            ->findOneByKey($navigationKey);

        if (!$navigationEntity) {
            throw new EntityNotFoundException(sprintf('Navigation by key "%s" not found.', $navigationKey));
        }

        return $navigationEntity->getIdNavigation();
    }
}
