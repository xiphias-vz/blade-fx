<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\AlternativeEan;

use Orm\Zed\AlternativeEan\Persistence\PyzAlternativeEanQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class AlternativeEanWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    protected const KEY_SAP_NUMBER = 'SAP Nummer';
    protected const KEY_PRODUCT_GROUP_ID = '<ID>';
    protected const KEY_NAME = '<Name>';
    protected const KEY_EAN = 'ordernumber';
    protected const KEY_IS_ACTIVE = 'Aktives Produkt';
    protected const KEY_IS_SALES_UNIT = 'Verkaufsmengeneinheit';
    protected const KEY_UNIT_OF_MEASURE_SAP = 'Mengeneinheit SAP';

    protected const STATUS_MAP = [
        'Ja' => true,
        'Nein' => false,
        '' => null,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        if (!$dataSet[static::KEY_EAN] || !$dataSet[static::KEY_SAP_NUMBER]) {
            return;
        }
        $pyzAlternativeEan = PyzAlternativeEanQuery::create()
            ->filterBySapNumber($dataSet[static::KEY_SAP_NUMBER])
            ->filterByEan($dataSet[static::KEY_EAN])
            ->findOneOrCreate();

        $pyzAlternativeEan
            ->setName($dataSet[static::KEY_NAME])
            ->setProductGroupId($dataSet[static::KEY_PRODUCT_GROUP_ID])
            ->setIsActive($this->convertStatusToBoolean($dataSet[static::KEY_IS_ACTIVE]))
            ->setIsSalesUnit($this->convertStatusToBoolean($dataSet[static::KEY_IS_SALES_UNIT]))
            ->setUnitOfMeasureSap($dataSet[static::KEY_UNIT_OF_MEASURE_SAP]);

        $pyzAlternativeEan->save();
    }

    /**
     * @param string $status
     *
     * @return bool|null
     */
    protected function convertStatusToBoolean(string $status): ?bool
    {
        return static::STATUS_MAP[$status];
    }
}
