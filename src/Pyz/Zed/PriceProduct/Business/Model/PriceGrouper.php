<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProduct\Business\Model;

use Generated\Shared\Transfer\PriceProductTransfer;
use Spryker\Zed\PriceProduct\Business\Model\PriceGrouper as SprykerPriceGrouper;

class PriceGrouper extends SprykerPriceGrouper
{
    protected const PRICE_PER_KG = 'PRICE_PER_KG';
    /**
     * @param \Generated\Shared\Transfer\PriceProductTransfer $priceProductTransfer
     * @param array $prices
     *
     * @return array
     */
    protected function groupPriceByCurrencyAndStore(PriceProductTransfer $priceProductTransfer, array $prices): array
    {
        $prices = parent::groupPriceByCurrencyAndStore($priceProductTransfer, $prices);

        $priceMoneyValueTransfer = $priceProductTransfer->getMoneyValue();

        $priceType = $priceProductTransfer->getPriceType()->getName();
        $currencyIsoCode = $priceMoneyValueTransfer->getCurrency()->getCode();

        if ($priceMoneyValueTransfer->getPricePerKg() !== null) {
            $prices[$currencyIsoCode][self::PRICE_PER_KG][$priceType] = $priceMoneyValueTransfer->getPricePerKg();
        }

        return $prices;
    }
}
