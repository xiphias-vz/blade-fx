<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Orm\Zed\ProductOption\Persistence\SpyProductAbstractProductOptionGroupQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValueQuery;
use Pyz\Shared\Sales\SalesConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\ProductOption\Dependency\ProductOptionEvents;

class ProductDepositOptionStep extends PublishAwareStep implements DataImportStepInterface
{
    private const KEY_DEPOSIT = 'Anzahl Pfand';

    /**
     * @var int[]
     */
    private static $idProductOptionGroup;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        if (empty($dataSet[self::KEY_DEPOSIT])) {
            return;
        }

        $depositQuantity = (int)$dataSet[self::KEY_DEPOSIT];

        $this->loadIdProductOptionGroup($depositQuantity);

        $idProductAbstract = $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT];

        SpyProductAbstractProductOptionGroupQuery::create()
            ->filterByFkProductOptionGroup(static::$idProductOptionGroup[$depositQuantity])
            ->filterByFkProductAbstract($idProductAbstract)
            ->findOneOrCreate()
            ->save();

        $this->addPublishEvents(ProductOptionEvents::PRODUCT_ABSTRACT_PRODUCT_OPTION_PUBLISH, $idProductAbstract);
    }

    /**
     * @param int $depositQuantity
     *
     * @return void
     */
    private function loadIdProductOptionGroup(int $depositQuantity): void
    {
        if (!empty(static::$idProductOptionGroup[$depositQuantity])) {
            return;
        }

        static::$idProductOptionGroup[$depositQuantity] = SpyProductOptionValueQuery::create()
            ->filterBySku(SalesConfig::DEPOSIT_OPTION_NAME . '_' . $depositQuantity)
            ->findOne()
            ->getFkProductOptionGroup();
    }
}
