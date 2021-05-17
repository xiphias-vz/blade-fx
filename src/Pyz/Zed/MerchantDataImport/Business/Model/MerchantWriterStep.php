<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business\Model;

use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Pyz\Zed\MerchantDataImport\Business\Model\DataSet\MerchantDataSetInterface;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class MerchantWriterStep implements DataImportStepInterface
{
    protected const REQUIRED_DATA_SET_KEYS = [
        MerchantDataSetInterface::MERCHANT_KEY,
        MerchantDataSetInterface::NAME,
        MerchantDataSetInterface::REGISTRATION_NUMBER,
        MerchantDataSetInterface::STATUS,
        MerchantDataSetInterface::EMAIL,
        MerchantDataSetInterface::REGION_NUMBER,
        MerchantDataSetInterface::REGION_NAME,
        MerchantDataSetInterface::FILIAL_NUMBER,
        MerchantDataSetInterface::ZIP_CODE,
        MerchantDataSetInterface::CITY,
        MerchantDataSetInterface::STREET,
        MerchantDataSetInterface::LATITUDE,
        MerchantDataSetInterface::LONGITUDE,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        /** @var \Orm\Zed\Merchant\Persistence\SpyMerchant $merchantEntity */
        $merchantEntity = SpyMerchantQuery::create()
            ->filterByMerchantKey($dataSet[MerchantDataSetInterface::MERCHANT_KEY])
            ->findOneOrCreate();

        $merchantEntity
            ->setFkStore($dataSet[MerchantDataSetInterface::ID_STORE])
            ->setName($dataSet[MerchantDataSetInterface::NAME])
            ->setRegistrationNumber($dataSet[MerchantDataSetInterface::REGISTRATION_NUMBER])
            ->setStatus($dataSet[MerchantDataSetInterface::STATUS])
            ->setEmail($dataSet[MerchantDataSetInterface::EMAIL])
            ->setMerchantReference($dataSet[MerchantDataSetInterface::MERCHANT_REFERENCE])
            ->setRegionNumber($dataSet[MerchantDataSetInterface::REGION_NUMBER])
            ->setRegionName($dataSet[MerchantDataSetInterface::REGION_NAME])
            ->setFilialNumber($dataSet[MerchantDataSetInterface::FILIAL_NUMBER])
            ->setZipCode($dataSet[MerchantDataSetInterface::ZIP_CODE])
            ->setCity($dataSet[MerchantDataSetInterface::CITY])
            ->setStreet($dataSet[MerchantDataSetInterface::STREET])
            ->setLatitude($dataSet[MerchantDataSetInterface::LATITUDE])
            ->setLongitude($dataSet[MerchantDataSetInterface::LONGITUDE])
            ->setDeliveryCapacityPerSlot($dataSet[MerchantDataSetInterface::DELIVERY_CAPACITY_PER_SLOT])
            ->setPickingCapacityPerSlot($dataSet[MerchantDataSetInterface::PICKING_CAPACITY_PER_SLOT])
            ->setMerchantShortName($dataSet[MerchantDataSetInterface::STORE])
            ->save();
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function validateDataSet(DataSetInterface $dataSet): void
    {
        foreach (static::REQUIRED_DATA_SET_KEYS as $requiredDataSetKey) {
            $this->validateRequireDataSetByKey($dataSet, $requiredDataSetKey);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $requiredDataSetKey
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function validateRequireDataSetByKey(DataSetInterface $dataSet, string $requiredDataSetKey): void
    {
        if (!$dataSet[$requiredDataSetKey]) {
            throw new InvalidDataException('"' . $requiredDataSetKey . '" is required.');
        }
    }
}
