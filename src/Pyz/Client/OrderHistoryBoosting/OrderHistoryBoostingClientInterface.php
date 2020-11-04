<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderHistoryBoosting;

use Generated\Shared\Transfer\QuoteTransfer;

interface OrderHistoryBoostingClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function extendCustomerTransfer(QuoteTransfer $quoteTransfer): void;
}
