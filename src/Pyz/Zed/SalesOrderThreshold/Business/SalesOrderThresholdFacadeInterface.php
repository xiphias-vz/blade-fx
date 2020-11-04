<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\SalesOrderThreshold\Business\SalesOrderThresholdFacadeInterface as SprykerSalesOrderThresholdFacadeInterface;

interface SalesOrderThresholdFacadeInterface extends SprykerSalesOrderThresholdFacadeInterface
{
    /**
     * Specification:
     * - Expands quote transfer with `isHardThresholdReached` which indicates that cart total price has met hard threshold.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer;

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardMaxThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer;
}
