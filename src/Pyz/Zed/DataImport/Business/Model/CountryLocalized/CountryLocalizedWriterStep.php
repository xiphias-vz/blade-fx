<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\CountryLocalized;

use Generated\Shared\Transfer\PyzCountryLocalizedEntityTransfer;
use Orm\Zed\Country\Persistence\SpyCountryQuery;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\Sales\Persistence\PyzCountryLocalizedQuery;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class CountryLocalizedWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const ISO2_CODE = 'iso2_code'; //get id_country from spy_country
    public const ISO3_CODE = 'iso3_code';
    public const NAME = 'name';
    public const NAME_LOCALIZED = 'name_localized';
    public const LOCALE_NAME = 'locale_name';  //get id_locale from spy_locale

    protected const REQUIRED_DATA_SET_KEYS = [
        self::ISO2_CODE,
        self::LOCALE_NAME,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        $countryLocalizedTransfers = $this->mapDataSetToCountryLocalizedEntityTransfer($dataSet, new PyzCountryLocalizedEntityTransfer());
        $countryLocalizedTransfers->setFkLocale($this->getFkLocale($dataSet[static::LOCALE_NAME]));
        $countryLocalizedTransfers->setFkCountry($this->getFkCountry($dataSet[static::ISO2_CODE]));
        $this->saveCountryLocalized($countryLocalizedTransfers);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function validateDataSet(DataSetInterface $dataSet): void
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

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Generated\Shared\Transfer\PyzCountryLocalizedEntityTransfer $countryLocalizedEntityTransfer
     *
     * @return \Generated\Shared\Transfer\PyzCountryLocalizedEntityTransfer
     */
    protected function mapDataSetToCountryLocalizedEntityTransfer(
        DataSetInterface $dataSet,
        PyzCountryLocalizedEntityTransfer $countryLocalizedEntityTransfer
    ): PyzCountryLocalizedEntityTransfer {
        $countryLocalizedEntityTransfer->fromArray($dataSet->getArrayCopy(), true);

        return $countryLocalizedEntityTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PyzCountryLocalizedEntityTransfer $countryLocalizedEntityTransfer
     *
     * @return void
     */
    protected function saveCountryLocalized(PyzCountryLocalizedEntityTransfer $countryLocalizedEntityTransfer): void
    {
        if (!empty($countryLocalizedEntityTransfer->getNameLocalized())) {
            $pyzCountryLocalizedEntity = PyzCountryLocalizedQuery::create()
                ->filterByFkCountry($countryLocalizedEntityTransfer->getFkCountry())
                ->filterByFkLocale($countryLocalizedEntityTransfer->getFkLocale())
                ->findOneOrCreate();

            $pyzCountryLocalizedEntity->setFkCountry($countryLocalizedEntityTransfer->getFkCountry());
            $pyzCountryLocalizedEntity->setFkLocale($countryLocalizedEntityTransfer->getFkLocale());
            $pyzCountryLocalizedEntity->setNameLocalized($countryLocalizedEntityTransfer->getNameLocalized());

            if ($pyzCountryLocalizedEntity->isNew() || $pyzCountryLocalizedEntity->isModified()) {
                $pyzCountryLocalizedEntity->save();
            }
        }
    }

    /**
     * @param string $iso2_code
     *
     * @return int
     */
    protected function getFkCountry(string $iso2_code): int
    {
        $spyCountry = SpyCountryQuery::create()
            ->filterByIso2Code($iso2_code)
            ->findOne();

        return $spyCountry->getIdCountry();
    }

    /**
     * @param string $locale
     *
     * @return int
     */
    protected function getFkLocale(string $locale): int
    {
        $spyLocale = SpyLocaleQuery::create()
            ->filterByLocaleName($locale)
            ->findOne();

        return $spyLocale->getIdLocale();
    }
}
