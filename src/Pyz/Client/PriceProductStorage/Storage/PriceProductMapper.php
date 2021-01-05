<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PriceProductStorage\Storage;

use Spryker\Client\PriceProductStorage\Storage\PriceProductMapper as SprykerPriceProductMapper;
use Spryker\Shared\PriceProductStorage\PriceProductStorageConfig;

class PriceProductMapper extends SprykerPriceProductMapper
{
    protected const PRICE_PER_KG = 'PRICE_PER_KG';
    protected const DEFAULT = 'DEFAULT';

    /**
     * @param \Generated\Shared\Transfer\PriceProductTransfer[] $priceProductTransfers
     * @param array $prices
     * @param string $currencyCode
     *
     * @return void
     */
    protected function getPriceProductTransfersFromPriceData(
        array &$priceProductTransfers,
        array $prices,
        string $currencyCode
    ): void {
        foreach (PriceProductStorageConfig::PRICE_MODES as $priceMode) {
            if (!isset($prices[$priceMode])) {
                continue;
            }
            foreach ($prices[$priceMode] as $priceAttribute => $priceValue) {
                $priceProductTransfer = $this->findProductTransferInCollection($currencyCode, $priceAttribute, $priceProductTransfers);

                $priceProductTransfer->setGroupKey($this->priceProductService->buildPriceProductGroupKey($priceProductTransfer))
                    ->setIsMergeable(true);

                if ($priceMode === PriceProductStorageConfig::PRICE_GROSS_MODE) {
                    $priceProductTransfer->getMoneyValue()->setGrossAmount($priceValue);
                    $priceProductTransfer = $this->setPriceData($priceProductTransfer, $prices);

                    continue;
                }

                $priceProductTransfer->getMoneyValue()->setNetAmount($priceValue);
                $priceProductTransfer = $this->setPriceData($priceProductTransfer, $prices);
            }
        }
        if (isset($prices[static::PRICE_PER_KG][static::DEFAULT])) {
            $priceValue = $prices[static::PRICE_PER_KG][static::DEFAULT];
            $priceProductTransfer = $this->findProductTransferInCollection($currencyCode, 'DEFAULT', $priceProductTransfers);
            $priceProductTransfer->getMoneyValue()->setPricePerKg($priceValue);
            $priceProductTransfer = $this->setPriceData($priceProductTransfer, $prices);
        }
    }
}
