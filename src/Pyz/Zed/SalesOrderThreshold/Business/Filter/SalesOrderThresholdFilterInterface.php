<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business\Filter;

interface SalesOrderThresholdFilterInterface
{
    /**
     * @param \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer[] $salesOrderThresholdValueTransfers
     * @param string $thresholdGroup
     *
     * @return \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer[]
     */
    public function filterSalesOrderThresholdsByThresholdGroup(array $salesOrderThresholdValueTransfers, string $thresholdGroup): array;
}
