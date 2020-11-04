<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Persistence;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Payment\Persistence\PaymentEntityManager as SprykerPaymentEntityManager;

/**
 * @method \Spryker\Zed\Payment\Persistence\PaymentPersistenceFactory getFactory()
 */
class PaymentEntityManager extends SprykerPaymentEntityManager implements PaymentEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function updateSalesPayment(OrderTransfer $orderTransfer): bool
    {
        $salesPaymentEntity = $this->getFactory()
            ->createSalesPaymentQuery()
            ->filterByFkSalesOrder($orderTransfer->getIdSalesOrder())
            ->findOne();

        if (!$salesPaymentEntity) {
            return false;
        }

        $salesPaymentEntity->setAmount($orderTransfer->getTotals()->getGrandTotal());
        $salesPaymentEntity->save();

        return true;
    }
}
