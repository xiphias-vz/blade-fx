<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOption\Business\Expander;

use Spryker\Zed\ProductOption\Business\Expander\ProductOptionExpander as SprykerProductOptionExpander;

class ProductOptionExpander extends SprykerProductOptionExpander
{
    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function expandOrderItemsWithProductOptions(array $itemTransfers): array
    {
        $salesOrderItemIds = $this->extractSalesOrderItemIds($itemTransfers);
        $mappedOrderItemsWithProductOptions = $this->getMappedOrderItemsWithProductOptions($salesOrderItemIds);

        $productOptionSkus = $this->extractProductOptionSkus($mappedOrderItemsWithProductOptions);
        $mappedProductOptionValueTransfers = $this->getMappedProductOptionValues($productOptionSkus);

        foreach ($itemTransfers as $itemTransfer) {
            if (!isset($mappedOrderItemsWithProductOptions[$itemTransfer->getIdSalesOrderItem()])) {
                continue;
            }

            $this->expandOrderItemWithProductOptions(
                $itemTransfer,
                $mappedOrderItemsWithProductOptions[$itemTransfer->getIdSalesOrderItem()],
                $mappedProductOptionValueTransfers
            );
        }

        return $itemTransfers;
    }
}
