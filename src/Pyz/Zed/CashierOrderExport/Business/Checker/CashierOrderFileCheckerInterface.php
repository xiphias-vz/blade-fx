<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

interface CashierOrderFileCheckerInterface
{
    /**
     * @param string $archiveFilePath
     *
     * @return bool
     */
    public function isFileExist(string $archiveFilePath): bool;
}
