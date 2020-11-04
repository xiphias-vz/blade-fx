<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport;

use Pyz\Shared\Sales\SalesConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class PostingExportConfig extends AbstractBundleConfig
{
    public const DATE_FORMAT = 'd.m.Y';
    public const FILE_NAME_DELIMITER = '-';
    public const TAX_ZERO = 0;
    public const TAX_LOW = 700;
    public const TAX_STANDARD = 1900;

    /**
     * @return int
     */
    public function getDepositUnitPrice(): int
    {
        return (int)$this->get(SalesConstants::BOTTLE_DEPOSIT_PRICE_IN_CENTS);
    }
}
