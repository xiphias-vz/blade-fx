<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Invoice;

use Spryker\Shared\Kernel\KernelConfig as SprykerKernelConfig;

class InvoiceConfig extends SprykerKernelConfig
{
    public const NAME_INVOICE_REFERENCE = 'InvoiceReference';
    public const ROUTE_CUSTOMER_INVOICE = 'customer/order/invoice';


}
