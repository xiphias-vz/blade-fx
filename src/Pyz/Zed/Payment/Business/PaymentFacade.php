<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Payment\Business\PaymentFacade as SprykerPaymentFacade;

/**
 * @method \Pyz\Zed\Payment\Business\PaymentBusinessFactory getFactory()
 * @method \Spryker\Zed\Payment\Persistence\PaymentEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\Payment\Persistence\PaymentRepositoryInterface getRepository()
 */
class PaymentFacade extends SprykerPaymentFacade implements PaymentFacadeInterface
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
    public function updateSalesPayment(OrderTransfer $orderTransfer): bool
    {
        return $this->getFactory()
            ->createSalesPaymentWriter()
            ->updateSalesPayment($orderTransfer);
    }
}
