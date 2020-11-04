<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\SalesOrderThreshold\Business\SalesOrderThresholdFacade as SprykerSalesOrderThresholdFacade;

/**
 * @method \Pyz\Zed\SalesOrderThreshold\Business\SalesOrderThresholdBusinessFactory getFactory()
 */
class SalesOrderThresholdFacade extends SprykerSalesOrderThresholdFacade implements SalesOrderThresholdFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        return $this->getFactory()
            ->createThresholdQuoteExpander()
            ->expandWithHardThresholdReached($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardMaxThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        return $this->getFactory()
            ->createThresholdQuoteExpander()
            ->expandWithHardMaxThresholdReached($quoteTransfer);
    }
}
