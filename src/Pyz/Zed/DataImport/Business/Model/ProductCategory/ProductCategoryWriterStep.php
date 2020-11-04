<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductCategory;

use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\ProductCategory\Persistence\SpyProductCategoryQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\Product\Persistence\Propel\AbstractSpyProductAbstractQuery;
use Spryker\Zed\ProductCategory\Dependency\ProductCategoryEvents;

class ProductCategoryWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;
    public const KEY_PRODUCT_SKU = 'Artikelnummer';
    public const KEY_CATEGORY_ID = 'Kategorie';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $productAbstractIds = $this->getProductAbstractIds($dataSet);

        foreach ($productAbstractIds as $productAbstractId) {
            $productCategoryEntity = SpyProductCategoryQuery::create()
                ->filterByFkProductAbstract($productAbstractId)
                ->filterByFkCategory($this->getCategoryId($dataSet))
                ->findOneOrCreate();

            if ($productCategoryEntity->isNew() || $productCategoryEntity->isModified()) {
                $productCategoryEntity->save();
            }

            $this->addPublishEvents(ProductCategoryEvents::PRODUCT_CATEGORY_PUBLISH, $productAbstractId);
            $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $productAbstractId);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return array
     */
    public function getProductAbstractIds(DataSetInterface $dataSet): array
    {
        $productAbstractIds = [];
        $productAbstractEntities = AbstractSpyProductAbstractQuery::create()
            ->filterBySku_Like($dataSet[static::KEY_PRODUCT_SKU] . '\_%')
            ->find();

        foreach ($productAbstractEntities as $productAbstractEntity) {
            $productAbstractIds[] = $productAbstractEntity->getIdProductAbstract();
        }

        return $productAbstractIds;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return int
     */
    public function getCategoryId(DataSetInterface $dataSet)
    {
        $categoryEntity = SpyCategoryQuery::create()
            ->filterByCategoryKey_Like('%\_' . $dataSet[static::KEY_CATEGORY_ID])
            ->findOne();

        return $categoryEntity->getIdCategory();
    }
}
