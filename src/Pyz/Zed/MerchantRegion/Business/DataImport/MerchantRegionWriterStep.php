<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Business\DataImport;

use Orm\Zed\MerchantRegion\Persistence\PyzMerchantRegionQuery;
use Pyz\Zed\MerchantRegion\Business\DataImport\DataSet\MerchantRegionDataSetInterface;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class MerchantRegionWriterStep implements DataImportStepInterface
{
    protected const REQUIRED_DATA_SET_KEYS = [
        MerchantRegionDataSetInterface::ABBREVIATION,
        MerchantRegionDataSetInterface::REGION_NUMBER,
        MerchantRegionDataSetInterface::REGION_NAME,
        MerchantRegionDataSetInterface::STREET,
        MerchantRegionDataSetInterface::ZIP_CODE,
        MerchantRegionDataSetInterface::CITY,
        MerchantRegionDataSetInterface::VAT,
        MerchantRegionDataSetInterface::FAX,
        MerchantRegionDataSetInterface::FOOTER,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        /** @var \Orm\Zed\MerchantRegion\Persistence\PyzMerchantRegion $merchantRegion */
        $merchantRegion = PyzMerchantRegionQuery::create()
            ->filterByRegionNumber($dataSet[MerchantRegionDataSetInterface::REGION_NUMBER])
            ->findOneOrCreate();

        $merchantRegion
            ->setAbbreviation($dataSet[MerchantRegionDataSetInterface::ABBREVIATION])
            ->setRegionNumber((int)$dataSet[MerchantRegionDataSetInterface::REGION_NUMBER])
            ->setRegionName($dataSet[MerchantRegionDataSetInterface::REGION_NAME])
            ->setStreet($dataSet[MerchantRegionDataSetInterface::STREET])
            ->setZipCode($dataSet[MerchantRegionDataSetInterface::ZIP_CODE])
            ->setCity($dataSet[MerchantRegionDataSetInterface::CITY])
            ->setVat($dataSet[MerchantRegionDataSetInterface::VAT])
            ->setFax($dataSet[MerchantRegionDataSetInterface::FAX])
            ->setFooterText($dataSet[MerchantRegionDataSetInterface::FOOTER])
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
