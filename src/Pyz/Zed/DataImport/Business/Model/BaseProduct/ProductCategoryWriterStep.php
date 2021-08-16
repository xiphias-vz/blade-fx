<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\ProductCategory\Persistence\Map\SpyProductCategoryTableMap;
use Orm\Zed\ProductCategory\Persistence\SpyProductCategoryQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\ProductCategory\Dependency\ProductCategoryEvents;

class ProductCategoryWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;
    public const KEY_CATEGORY_KEY = 'Classification_ID';
    public const KEY_SORTING_ORDER = 'sortingorder';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $categoryId = $dataSet[self::KEY_CATEGORY_KEY];
        $listId = explode(";", $categoryId);
        $productOrder = 0;
        $currentRelationIds = [];

        if (isset($dataSet->getArrayCopy()[static::KEY_SORTING_ORDER])) {
            if ($dataSet->getArrayCopy()[static::KEY_SORTING_ORDER] != null) {
                $productOrder = $dataSet->getArrayCopy()[static::KEY_SORTING_ORDER];
            }
        }

        foreach ($listId as $value) {
            if ($value != "") {
                $dataSet[self::KEY_CATEGORY_KEY] = $value;
                $catId = $this->getCategoryId($dataSet);
                if ($catId > 0) {
                    $productCategoryEntity = SpyProductCategoryQuery::create()
                        ->filterByFkProductAbstract($dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT])
                        ->filterByFkCategory($this->getCategoryId($dataSet))
                        ->findOneOrCreate()
                        ->setProductOrder($productOrder);

                    if ($productCategoryEntity->isNew() || $productCategoryEntity->isModified()) {
                        $productCategoryEntity->save();
                    }

                    $currentRelationIds[] = $productCategoryEntity->getIdProductCategory();

                    $this->addPublishEvents(ProductCategoryEvents::PRODUCT_CATEGORY_PUBLISH, $dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT]);
                    $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT]);

                    $productOrder++;
                }
            }
        }
        $this->removeOldRelations($dataSet, $currentRelationIds);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param array $currentRelationIds
     *
     * @return void
     */
    protected function removeOldRelations(DataSetInterface $dataSet, array $currentRelationIds): void
    {
        SpyProductCategoryQuery::create()
            ->filterByFkProductAbstract($dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT])
            ->_and()
            ->where(SpyProductCategoryTableMap::COL_ID_PRODUCT_CATEGORY . Criteria::NOT_IN . '(' . implode(',', $currentRelationIds) . ')')
            ->find()
            ->delete();
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return int
     */
    public function getCategoryId(DataSetInterface $dataSet)
    {
        $categoryEntity = SpyCategoryQuery::create()
            ->filterByCategoryKey($dataSet[static::KEY_CATEGORY_KEY])
            ->findOne();

        return $categoryEntity ? $categoryEntity->getIdCategory() : -1;
    }
}
