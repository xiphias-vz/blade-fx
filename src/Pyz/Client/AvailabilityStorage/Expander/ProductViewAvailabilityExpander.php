<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\AvailabilityStorage\Expander;

use Generated\Shared\Transfer\ProductViewTransfer;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Client\AvailabilityStorage\Expander\ProductViewAvailabilityExpander as SprykerProductViewAvailabilityExpander;
use Spryker\Shared\Config\Config;

class ProductViewAvailabilityExpander extends SprykerProductViewAvailabilityExpander
{
    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    public function expandProductViewWithAvailability(ProductViewTransfer $productViewTransfer): ProductViewTransfer
    {
        $storageAvailabilityTransfer = $this->availabilityStorageReader
            ->getAvailabilityAbstractAsStorageTransfer($productViewTransfer->getIdProductAbstract());

        if (!$productViewTransfer->getIdProductConcrete()) {
            $productViewTransfer->setAvailable($storageAvailabilityTransfer->getIsAbstractProductAvailable());

            return $productViewTransfer;
        }

        $concreteProductAvailableItems = $storageAvailabilityTransfer->getConcreteProductAvailableItems();
        $merchantsFromConfig = Config::get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
        $currentMerchant = $productViewTransfer->getCurrentMerchant();
        $currentMerchantKey = 0;

        foreach ($merchantsFromConfig as $key => $merchant) {
            if ($key == $currentMerchant) {
                $currentMerchantKey = $key;
                break;
            }
        }

        if (count($concreteProductAvailableItems) > 1) {
            $extension = '_' . $currentMerchantKey;
            foreach ($concreteProductAvailableItems as $key => $concreteProductAvailableItem) {
                if (str_contains($key, $extension)) {
                    $productViewTransfer->setAvailable($concreteProductAvailableItem);
                }
            }
        } elseif (count($concreteProductAvailableItems) === 1) {
            $productViewTransfer->setAvailable($concreteProductAvailableItems[array_keys($concreteProductAvailableItems)[0]]);
        }

        $productViewTransfer = $this->executeAvailabilityStorageStrategyPlugins($productViewTransfer);

        return $productViewTransfer;
    }
}
