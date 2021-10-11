<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\ProductPrice;

use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery;
use Pyz\Zed\DataImport\Business\Model\ProductPrice\ProductPriceWriterStep as IntProductPriceWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;

class ProductPriceWriterStep extends IntProductPriceWriterStep
{
    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $type
     * @param string $keyActiveFrom
     * @param string $keyActiveTo
     *
     * @return \Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery
     */
    protected function createPriceProductScheduleQuery(DataSetInterface $dataSet, string $type, string $keyActiveFrom, string $keyActiveTo): SpyPriceProductScheduleQuery
    {
        $priceProductScheduleQuery = SpyPriceProductScheduleQuery::create();
        $priceProductScheduleQuery
            ->filterByFkPriceType($this->getIdPriceTypeByName($type))
            ->filterByFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
            ->filterByFkCurrency($this->getIdCurrencyByCode('CZK'))
            ->filterByActiveFrom($dataSet[$keyActiveFrom])
            ->filterByActiveTo($dataSet[$keyActiveTo])
            ->filterByFkProductAbstract($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT]);

        return $priceProductScheduleQuery;
    }
}
