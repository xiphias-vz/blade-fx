<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use DateInterval;
use DateTime;
use Orm\Zed\ProductValidity\Persistence\SpyProductValidityQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\Product\Dependency\ProductEvents;

class ProductValidityWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_VALID_FROM = 'Kontrakt aktiv von';
    public const KEY_VALID_TO = 'Kontrakt aktiv bis';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        if (!$this->isValidDate($dataSet[self::KEY_VALID_FROM]) && !$this->isValidDate($dataSet[self::KEY_VALID_TO])) {
            SpyProductValidityQuery::create()
                ->filterByFkProduct($dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE])
                ->delete();

            return;
        }

        $productValidity = SpyProductValidityQuery::create()
            ->filterByFkProduct($dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE])
            ->findOneOrCreate();

        $validFrom = new DateTime('-1 year');
        if ($this->isValidDate($dataSet[self::KEY_VALID_FROM])) {
            $validFrom = new DateTime($dataSet[self::KEY_VALID_FROM]);
        }

        if (!$this->isValidDate($dataSet[self::KEY_VALID_TO])) {
            $validTo = (clone $validFrom)->add(new DateInterval('P1Y'));
        } else {
            $validTo = new DateTime($dataSet[self::KEY_VALID_TO]);
        }

        $productValidity->setValidFrom($validFrom)
            ->setValidTo($validTo);

        if ($productValidity->isModified() || $productValidity->isNew()) {
            $productValidity->save();

            $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT]);
        }
    }

    /**
     * @param mixed $dateValue
     *
     * @return bool
     */
    protected function isValidDate($dateValue): bool
    {
        return !empty($dateValue) && strtotime($dateValue);
    }
}
