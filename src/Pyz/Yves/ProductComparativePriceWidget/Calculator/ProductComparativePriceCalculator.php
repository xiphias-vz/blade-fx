<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductComparativePriceWidget\Calculator;

use Generated\Shared\Transfer\ProductComparativePriceTransfer;
use Spryker\Client\Currency\CurrencyClientInterface;
use Spryker\Client\GlossaryStorage\GlossaryStorageClientInterface;
use Spryker\Client\Locale\LocaleClientInterface;

class ProductComparativePriceCalculator implements ProductComparativePriceCalculatorInterface
{
    protected const INPUT_UNIT_GRAM = 'G';
    protected const INPUT_UNIT_KILOGRAM = 'KG';
    protected const INPUT_UNIT_MILLILITER = 'ML';
    protected const INPUT_UNIT_LITER = 'LTR';
    protected const INPUT_UNIT_PIECE = 'STÜCK';
    protected const INPUT_UNIT_PIECE_ITEM = 'ITEM';

    protected const OUTPUT_UNIT_GRAM = 'product_comparative_price.output.unit.gram';
    protected const OUTPUT_UNIT_KILOGRAM = 'product_comparative_price.output.unit.kilogram';
    protected const OUTPUT_UNIT_MILLILITER = 'product_comparative_price.output.unit.milliliter';
    protected const OUTPUT_UNIT_LITER = 'product_comparative_price.output.unit.liter';

    protected const LOWER_THRESHOLD = 0.25;
    protected const UPPER_THRESHOLD = 250;
    protected const PER_VOLUME_UNITS = 100;

    protected const INPUT_UNITS = [
        self::INPUT_UNIT_GRAM,
        self::INPUT_UNIT_KILOGRAM,
        self::INPUT_UNIT_MILLILITER,
        self::INPUT_UNIT_LITER,
    ];

    protected const INVALID_SALE_VOLUMES = [
        0.1,
        1,
        100,
    ];

    /**
     * @var \Spryker\Client\Currency\CurrencyClientInterface
     */
    private $currencyClient;

    /**
     * @var \Spryker\Client\GlossaryStorage\GlossaryStorageClientInterface
     */
    private $glossaryStorageClient;

    /**
     * @var \Spryker\Client\Locale\LocaleClientInterface
     */
    private $localeClient;

    /**
     * @param \Spryker\Client\Currency\CurrencyClientInterface $currencyClient
     * @param \Spryker\Client\GlossaryStorage\GlossaryStorageClientInterface $glossaryStorageClient
     * @param \Spryker\Client\Locale\LocaleClientInterface $localeClient
     */
    public function __construct(
        CurrencyClientInterface $currencyClient,
        GlossaryStorageClientInterface $glossaryStorageClient,
        LocaleClientInterface $localeClient
    ) {
        $this->currencyClient = $currencyClient;
        $this->glossaryStorageClient = $glossaryStorageClient;
        $this->localeClient = $localeClient;
    }

    /**
     * @param string $productPrice
     * @param string|null $productSaleUnit
     * @param string|null $productSaleVolume
     *
     * @return \Generated\Shared\Transfer\ProductComparativePriceTransfer
     */
    public function calculate(
        string $productPrice,
        ?string $productSaleUnit,
        ?string $productSaleVolume
    ): ProductComparativePriceTransfer {
        $productComparativePriceTransfer = (new ProductComparativePriceTransfer())->setIsValid(true);

        if (!$this->isProductSaleValuesValid($productSaleUnit, $productSaleVolume)) {
            $productComparativePriceTransfer->setIsValid(false);

            return $productComparativePriceTransfer;
        }

        $priceMultiplier = $this->getPriceMultiplier($productSaleUnit, $productSaleVolume);

        $productComparativePriceTransfer->setAmount((int)round($productPrice * $priceMultiplier / $productSaleVolume));
        $productComparativePriceTransfer->setUnit(
            $this->getComparativePriceUnit($productSaleUnit, $productSaleVolume, $this->localeClient)
        );
        $productComparativePriceTransfer->setCurrencySymbol($this->currencyClient->getCurrent()->getSymbol());

        return $productComparativePriceTransfer;
    }

    /**
     * @param string|null $productSaleUnit
     * @param string|null $productSaleVolume
     *
     * @return bool
     */
    private function isProductSaleValuesValid(?string $productSaleUnit, ?string $productSaleVolume): bool
    {
        if (!$productSaleUnit || !$productSaleVolume) {
            return false;
        }

        if (mb_strtoupper($productSaleUnit) === static::INPUT_UNIT_PIECE || mb_strtoupper($productSaleUnit) === static::INPUT_UNIT_PIECE_ITEM) {
            return false;
        }

        if (in_array($productSaleVolume, static::INVALID_SALE_VOLUMES)
            && in_array(mb_strtoupper($productSaleUnit), static::INPUT_UNITS)
        ) {
            return false;
        }

        if (preg_match('/^\d+[xX]\d+$/', $productSaleVolume)) {
            return false;
        }

        return true;
    }

    /**
     * @param string $productSaleUnit
     * @param string $productSaleVolume
     *
     * @return float
     */
    private function getPriceMultiplier(string $productSaleUnit, string $productSaleVolume): float
    {
        if ($this->isProductSaleUnitGram($productSaleUnit) || $this->isProductSaleUnitMilliliter($productSaleUnit)) {
            return $productSaleVolume <= static::UPPER_THRESHOLD ? 100 : 1000;
        }

        return $productSaleVolume <= static::LOWER_THRESHOLD ? 0.1 : 1;
    }

    /**
     * @param string $productSaleUnit
     * @param string $productSaleVolume
     * @param \Spryker\Client\Locale\LocaleClientInterface $localeClient
     *
     * @return string
     */
    private function getComparativePriceUnit(
        string $productSaleUnit,
        string $productSaleVolume,
        LocaleClientInterface $localeClient
    ): string {
        if ($this->isProductSaleUnitGram($productSaleUnit) || $this->isProductSaleUnitMilliliter($productSaleUnit)) {
            if ($productSaleVolume <= static::UPPER_THRESHOLD) {
                $comparativePriceUnit = $this->isProductSaleUnitGram($productSaleUnit)
                    ? static::OUTPUT_UNIT_GRAM
                    : static::OUTPUT_UNIT_MILLILITER;

                return sprintf(
                    '%s %s',
                    static::PER_VOLUME_UNITS,
                    $this->glossaryStorageClient->translate($comparativePriceUnit, $localeClient->getCurrentLocale())
                );
            }

            return $this->glossaryStorageClient->translate(
                $this->isProductSaleUnitGram($productSaleUnit) ? static::OUTPUT_UNIT_KILOGRAM : static::OUTPUT_UNIT_LITER,
                $localeClient->getCurrentLocale()
            );
        }

        if ($productSaleVolume <= static::LOWER_THRESHOLD) {
            $comparativePriceUnit = $this->isProductSaleUnitKilogram($productSaleUnit)
                ? static::OUTPUT_UNIT_GRAM
                : static::OUTPUT_UNIT_MILLILITER;

            return sprintf(
                '%s %s',
                static::PER_VOLUME_UNITS,
                $this->glossaryStorageClient->translate($comparativePriceUnit, $localeClient->getCurrentLocale())
            );
        }

        return $this->glossaryStorageClient->translate(
            $this->isProductSaleUnitKilogram($productSaleUnit) ? static::OUTPUT_UNIT_KILOGRAM : static::OUTPUT_UNIT_LITER,
            $localeClient->getCurrentLocale()
        );
    }

    /**
     * @param string $productSaleUnit
     *
     * @return bool
     */
    private function isProductSaleUnitGram(string $productSaleUnit): bool
    {
        return strtoupper($productSaleUnit) === strtoupper(static::INPUT_UNIT_GRAM);
    }

    /**
     * @param string $productSaleUnit
     *
     * @return bool
     */
    private function isProductSaleUnitMilliliter(string $productSaleUnit): bool
    {
        return strtoupper($productSaleUnit) === strtoupper(static::INPUT_UNIT_MILLILITER);
    }

    /**
     * @param string $productSaleUnit
     *
     * @return bool
     */
    private function isProductSaleUnitKilogram(string $productSaleUnit): bool
    {
        return strtoupper($productSaleUnit) === strtoupper(static::INPUT_UNIT_KILOGRAM);
    }
}
