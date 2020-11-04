<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\MerchantDeliveryPostalCode;

use Orm\Zed\Merchant\Persistence\PyzMerchantDeliveryPostalCodeQuery;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\PostalCode\Persistence\PyzPostalCodeQuery;
use Pyz\Zed\Merchant\Dependency\MerchantEvents;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class MerchantDeliveryPostalCodeWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    protected const KEY_REGION_NUMBER = 'region_number';
    protected const KEY_FILIAL_NUMBER = 'filial_number';
    protected const KEY_ZIP_CODE = 'zip_code';

    /**
     * @var array
     */
    protected static $merchantBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $spyMerchant = $this->getMerchantByFilialNumberAndRegionNumber(
            $dataSet[self::KEY_FILIAL_NUMBER],
            $dataSet[self::KEY_REGION_NUMBER]
        );

        $pyzPostalCode = PyzPostalCodeQuery::create()
            ->filterByPostalCode($dataSet[self::KEY_ZIP_CODE])
            ->findOne();

        if ($spyMerchant !== null && $pyzPostalCode !== null) {
            $pyzMerchantDeliveryPostalCode = PyzMerchantDeliveryPostalCodeQuery::create()
                ->filterByFkMerchant($spyMerchant->getIdMerchant())
                ->filterByFkPostalCode($pyzPostalCode->getIdPostalCode())
                ->findOneOrCreate();

            if ($pyzMerchantDeliveryPostalCode->isNew() || $pyzMerchantDeliveryPostalCode->isModified()) {
                $pyzMerchantDeliveryPostalCode->save();
            }

            $this->addPublishEvents(
                MerchantEvents::ENTITY_MERCHANT_DELIVERY_POSTAL_CODE_CREATE,
                $pyzMerchantDeliveryPostalCode->getIdMerchantDeliveryZipCode()
            );
        }
    }

    /**
     * @param int $filialNumber
     * @param int $regionNumber
     *
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchant|null
     */
    protected function getMerchantByFilialNumberAndRegionNumber(int $filialNumber, int $regionNumber): ?SpyMerchant
    {
        if (!isset(static::$merchantBuffer[$regionNumber][$filialNumber])) {
            static::$merchantBuffer[$regionNumber][$filialNumber] =
                SpyMerchantQuery::create()
                    ->filterByFilialNumber($filialNumber)
                    ->filterByRegionNumber($regionNumber)
                    ->findOne();
        }

        return static::$merchantBuffer[$regionNumber][$filialNumber];
    }
}
