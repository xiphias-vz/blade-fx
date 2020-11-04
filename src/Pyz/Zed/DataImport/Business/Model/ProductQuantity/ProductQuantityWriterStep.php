<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductQuantity;

use Orm\Zed\ProductQuantity\Persistence\SpyProductQuantity;
use Orm\Zed\ProductQuantity\Persistence\SpyProductQuantityQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\ProductQuantity\Dependency\ProductQuantityEvents;

class ProductQuantityWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_CART_MAX_QUANTITY = 'Warenkorb Limit';
    private const DEFAULT_INTERVAL = 1;
    private const DEFAULT_MIN_QUANTITY = 1;
    private const DEFAULT_MAX_QUANTITY = 99;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $spyProductQuantityEntity = $this->saveProductQuantity($dataSet);

        $this->addPublishEvents(ProductQuantityEvents::PRODUCT_QUANTITY_PUBLISH, $spyProductQuantityEntity->getFkProduct());
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\ProductQuantity\Persistence\SpyProductQuantity
     */
    protected function saveProductQuantity(DataSetInterface $dataSet): SpyProductQuantity
    {
        $idProduct = $dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE];
        $productCartLimit = (int)$dataSet[static::KEY_CART_MAX_QUANTITY];

        $spyProductQuantityEntity = SpyProductQuantityQuery::create()
            ->filterByFkProduct($idProduct)
            ->findOneOrCreate();

        $spyProductQuantityEntity
            ->setQuantityMax($productCartLimit ? $productCartLimit : static::DEFAULT_MAX_QUANTITY)
            ->setQuantityInterval(static::DEFAULT_INTERVAL)
            ->setQuantityMin(static::DEFAULT_MIN_QUANTITY)
            ->save();

        return $spyProductQuantityEntity;
    }
}
