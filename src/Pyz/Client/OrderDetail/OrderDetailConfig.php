<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail;

use Pyz\Shared\Invoice\InvoiceConstants;
use Pyz\Shared\Sales\SalesConstants;
use Spryker\Client\Kernel\AbstractBundleConfig;

class OrderDetailConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getBottleDepositPrice(): int
    {
        return (int)$this->get(SalesConstants::BOTTLE_DEPOSIT_PRICE_IN_CENTS);
    }

    /**
     * @return int
     */
    public function getInvoiceDueDateDays(): int
    {
        return (int)$this->get(InvoiceConstants::INVOICE_DUE_DATE_DAYS);
    }
}
