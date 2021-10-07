<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExportCZ\Business\Resolver;

use Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolver as IntCashierOrderFileNameResolver;

class CashierOrderFileNameResolver extends IntCashierOrderFileNameResolver
{
    protected const EXPORT_FILE_DEFAULT_NAME = 'update.log';

    /**
     * @return string
     */
    public function resolveCashierOrderExportFileName(): string
    {
        return static::EXPORT_FILE_DEFAULT_NAME;
    }
}
