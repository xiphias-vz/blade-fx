<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Communication\Plugin\Cart;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\CartExtension\Dependency\Plugin\PostReloadItemsPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\SalesOrderThreshold\Business\SalesOrderThresholdFacadeInterface getFacade()
 * @method \Spryker\Zed\SalesOrderThreshold\SalesOrderThresholdConfig getConfig()
 */
class HardMaxThresholdReachedQuoteExpanderPlugin extends AbstractPlugin implements PostReloadItemsPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands quote transfer with `isHardThresholdReached` which indicates that cart total price has met hard max threshold.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function postReloadItems(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        return $this->getFacade()->expandWithHardMaxThresholdReached($quoteTransfer);
    }
}
