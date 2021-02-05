<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceCartConnector\Business;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\PriceCartConnector\Business\PriceCartConnectorFacade as SpyPriceCartConnectorFacade;

/**
 * @method \Pyz\Zed\PriceCartConnector\Business\PriceCartConnectorBusinessFactory getFactory()
 */
class PriceCartConnectorFacade extends SpyPriceCartConnectorFacade
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function filterAvailableStoreItems(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        return $this->getFactory()->createItemsAvailableForStore()->filterItems($quoteTransfer);
    }
}
