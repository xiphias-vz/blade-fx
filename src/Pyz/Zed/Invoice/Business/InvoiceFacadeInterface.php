<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Business;

use DateTime;

interface InvoiceFacadeInterface
{
    /**
     * @param int $idSalesOrder
     * @param \DateTime $deliveryDateTime
     *
     * @return void
     */
    public function generateInvoiceReference(int $idSalesOrder, DateTime $deliveryDateTime): void;

    /**
     * @param int $idSalesOrder
     *
     * @return void
     */
    public function sendInvoiceEmail(int $idSalesOrder): void;
}
