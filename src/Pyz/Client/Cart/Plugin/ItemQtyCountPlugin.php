<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Cart\Plugin;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\Cart\Dependency\Plugin\ItemCountPluginInterface;

class ItemQtyCountPlugin implements ItemCountPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return int
     */
    public function getItemCount(QuoteTransfer $quoteTransfer): int
    {
        $quantity = 0;
        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $quantity += $itemTransfer->getQuantity();
        }

        return $quantity;
    }
}
