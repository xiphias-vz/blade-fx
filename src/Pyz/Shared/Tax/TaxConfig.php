<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Tax;

class TaxConfig
{
    public const TAX_RATE_ZERO = 0.00;
    public const TAX_RATE_LOW = 7.00;
    public const TAX_RATE_STANDARD = 16.00;
    public const TAX_RATES = [
        self::TAX_RATE_ZERO,
        self::TAX_RATE_LOW,
        self::TAX_RATE_STANDARD,
    ];
}
