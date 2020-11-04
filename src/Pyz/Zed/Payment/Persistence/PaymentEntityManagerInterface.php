<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Persistence;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Payment\Persistence\PaymentEntityManagerInterface as SprykerPaymentEntityManagerInterface;

interface PaymentEntityManagerInterface extends SprykerPaymentEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function updateSalesPayment(OrderTransfer $orderTransfer): bool;
}
