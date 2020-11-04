<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Payment\Business\PaymentFacadeInterface as SprykerPaymentFacadeInterface;

/**
 * @method \Spryker\Zed\Payment\Business\PaymentBusinessFactory getFactory()
 */
interface PaymentFacadeInterface extends SprykerPaymentFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function updateSalesPayment(OrderTransfer $orderTransfer): bool;
}
