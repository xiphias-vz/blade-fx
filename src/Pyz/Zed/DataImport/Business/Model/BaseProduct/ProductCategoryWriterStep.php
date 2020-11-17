<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\ProductCategory\Persistence\SpyProductCategoryQuery;
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

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
            $productCategoryEntity = SpyProductCategoryQuery::create()
                ->filterByFkProductAbstract($dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT])
                ->filterByFkCategory($this->getCategoryId($dataSet))
                ->findOneOrCreate();

        if ($productCategoryEntity->isNew() || $productCategoryEntity->isModified()) {
            $productCategoryEntity->save();
        }

            $this->addPublishEvents(ProductCategoryEvents::PRODUCT_CATEGORY_PUBLISH, $dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT]);
            $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $dataSet[ProductAbstractWriterStep::ID_PRODUCT_ABSTRACT]);
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

        return $categoryEntity->getIdCategory();
    }
}
