<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget\Model;

use SprykerShop\Yves\CustomerReorderWidget\Model\ItemFetcher as SpryItemFetcher;

class ItemFetcher extends SpryItemFetcher
{
    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    protected function cleanUpItems(array $itemTransfers): array
    {
        $cleanItems = [];
        foreach ($itemTransfers as $itemTransfer) {
            if ($this->productStorageClient->isProductConcreteRestricted($itemTransfer->getId())) {
                $this->addInfoMessage($itemTransfer);

                continue;
            }

            $idSaleOrderItem = $itemTransfer->getIdSalesOrderItem();
            $itemTransfer->setIdSalesOrderItem(null);
            $itemTransfer->setIsOrdered(false);
            $itemTransfer->setItemPaused(false);
            $itemTransfer = $this->cleanUpProductOptions($itemTransfer);
            $itemTransfer = $this->cleanUpItemShipmentAddress($itemTransfer);

            $cleanItems[$idSaleOrderItem] = $itemTransfer;
        }

        return $cleanItems;
    }
}
