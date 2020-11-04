<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment\Business;

use Pyz\Zed\Payment\Business\SalesPayment\SalesPaymentWriter;
use Spryker\Zed\Payment\Business\PaymentBusinessFactory as SprykerPaymentBusinessFactory;

/**
 * @method \Spryker\Zed\Payment\Persistence\PaymentQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Payment\Persistence\PaymentEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\Payment\Persistence\PaymentRepositoryInterface getRepository()
 * @method \Pyz\Zed\Payment\PaymentConfig getConfig()
 */
class PaymentBusinessFactory extends SprykerPaymentBusinessFactory
{
    /**
     * @return \Pyz\Zed\Payment\Business\SalesPayment\SalesPaymentWriter
     */
    public function createSalesPaymentWriter(): SalesPaymentWriter
    {
        return new SalesPaymentWriter(
            $this->getEntityManager()
        );
    }
}
