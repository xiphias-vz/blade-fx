<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Business\Workflow;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Checkout\Business\Workflow\CheckoutWorkflowInterface as SprykerCheckoutWorkflowInterface;

interface CheckoutWorkflowInterface extends SprykerCheckoutWorkflowInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function addCheckoutResponseTransfer(QuoteTransfer $quoteTransfer, OrderTransfer $orderTransfer);
}
