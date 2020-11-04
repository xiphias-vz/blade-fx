<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Business\SalesPayment;

use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\Payment\Persistence\PaymentEntityManagerInterface;

class SalesPaymentWriter
{
    /**
     * @var \Pyz\Zed\Payment\Persistence\PaymentEntityManagerInterface
     */
    protected $paymentEntityManager;

    /**
     * @param \Pyz\Zed\Payment\Persistence\PaymentEntityManagerInterface $paymentEntityManager
     */
    public function __construct(PaymentEntityManagerInterface $paymentEntityManager)
    {
        $this->paymentEntityManager = $paymentEntityManager;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function updateSalesPayment(OrderTransfer $orderTransfer): bool
    {
        return $this->paymentEntityManager->updateSalesPayment($orderTransfer);
    }
}
