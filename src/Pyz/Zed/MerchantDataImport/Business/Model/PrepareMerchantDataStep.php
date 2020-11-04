<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business\Model;

use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Pyz\Zed\MerchantDataImport\Business\Model\DataSet\MerchantDataSetInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Merchant\MerchantConfig;

class PrepareMerchantDataStep implements DataImportStepInterface
{
    private const FAKE_EMAIL = '%s@spryker.com';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $dataSet[MerchantDataSetInterface::MERCHANT_KEY] = $this->generateMerchantKey($dataSet);
        $dataSet[MerchantDataSetInterface::MERCHANT_REFERENCE] = $this->generateMerchantReference($dataSet);
        $dataSet[MerchantDataSetInterface::NAME] = $this->generateMerchantName($dataSet);
        $dataSet[MerchantDataSetInterface::REGISTRATION_NUMBER] = $this->generateMerchantRegistrationNumber($dataSet);
        $dataSet[MerchantDataSetInterface::EMAIL] = $this->generateMerchantEmail($dataSet);
        $dataSet[MerchantDataSetInterface::ID_STORE] = $this->getMerchantStore($dataSet);
        $dataSet[MerchantDataSetInterface::STATUS] = MerchantConfig::STATUS_APPROVED;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private function generateMerchantKey(DataSetInterface $dataSet): string
    {
        return $dataSet[MerchantDataSetInterface::REGION_NAME] . '_' .
            $dataSet[MerchantDataSetInterface::FILIAL_NUMBER] . '_' .
            $dataSet[MerchantDataSetInterface::ZIP_CODE];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private function generateMerchantReference(DataSetInterface $dataSet): string
    {
        return $dataSet[MerchantDataSetInterface::REGION_NAME] . '_' .
            $dataSet[MerchantDataSetInterface::FILIAL_NUMBER] . '_' .
            $dataSet[MerchantDataSetInterface::ZIP_CODE];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private function generateMerchantName(DataSetInterface $dataSet): string
    {
        return $dataSet[MerchantDataSetInterface::ZIP_CODE] . ' ' .
            $dataSet[MerchantDataSetInterface::CITY] . ', ' .
            $dataSet[MerchantDataSetInterface::STREET];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private function generateMerchantRegistrationNumber(DataSetInterface $dataSet): string
    {
        return $dataSet[MerchantDataSetInterface::FILIAL_NUMBER] . '_' .
            $dataSet[MerchantDataSetInterface::ZIP_CODE];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private function generateMerchantEmail(DataSetInterface $dataSet): string
    {
        $registrationNumber = $this->generateMerchantRegistrationNumber($dataSet);

        return sprintf(self::FAKE_EMAIL, $registrationNumber);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return int|null
     */
    private function getMerchantStore(DataSetInterface $dataSet): ?int
    {
        $store = SpyStoreQuery::create()
            ->findOneByName($dataSet[MerchantDataSetInterface::STORE]);

        if (!$store) {
            return null;
        }

        return $store->getIdStore();
    }
}
