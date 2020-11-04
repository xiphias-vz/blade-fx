<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Invoice;

use Spryker\Shared\Invoice\InvoiceConstants as SprykerInvoiceConstants;

interface InvoiceConstants extends SprykerInvoiceConstants
{
    public const INVOICE_EMAIL_BCC = 'INVOICE:INVOICE_EMAIL_BCC';
    public const INVOICE_PREFIX = 'INVOICE:INVOICE_PREFIX';
    public const INVOICE_CREATION_DELAY_IN_DAYS = 'INVOICE:INVOICE_CREATION_DELAY_IN_DAYS';
    public const INVOICE_TIME_HOURS = 'INVOICE:INVOICE_TIME_HOURS';
    public const INVOICE_DUE_DATE_DAYS = 'SALES:INVOICE_DUE_DATE_DAYS';
}
