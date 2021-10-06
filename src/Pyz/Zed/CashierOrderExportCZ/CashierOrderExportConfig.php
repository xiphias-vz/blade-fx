<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExportCZ;

use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig as IntCashierOrderExportConfig;

class CashierOrderExportConfig extends IntCashierOrderExportConfig
{
    protected const CASHIER_FILE_SUPPORTED_ENCODING = 'UTF-8';
    protected const TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP = [
        '21.00' => '1',
        '15.00' => '2',
        '10.00' => '4',
        '0' => '0',
    ];

    protected const SERVICE_FEE_TO_SERVICE_FEE_CASHIER_NUMBER = [
        '3900' => '00000002040000033064',
        '0' => '00000002070000251465',
    ];

    /**
     * @return array
     */
    public function getTaxRateToSapItemTaxIdMap(): array
    {
        return static::TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP;
    }

    /**
     * @return string[]
     */
    public function getServiceFeeToServiceFeeCashierNumber(): array
    {
        return static::SERVICE_FEE_TO_SERVICE_FEE_CASHIER_NUMBER;
    }

    /**
     * @return string
     */
    public function getCashierFileSupportedEncoding(): string
    {
        return static::CASHIER_FILE_SUPPORTED_ENCODING;
    }
}
