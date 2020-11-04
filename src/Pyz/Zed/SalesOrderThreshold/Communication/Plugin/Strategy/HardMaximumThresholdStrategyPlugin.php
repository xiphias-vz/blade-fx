<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Communication\Plugin\Strategy;

use Generated\Shared\Transfer\SalesOrderThresholdValueTransfer;
use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\AbstractSalesOrderThresholdStrategyPlugin;

class HardMaximumThresholdStrategyPlugin extends AbstractSalesOrderThresholdStrategyPlugin
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getKey(): string
    {
        return SalesOrderThresholdConfig::THRESHOLD_STRATEGY_KEY_HARD_MAX;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getGroup(): string
    {
        return SalesOrderThresholdConfig::GROUP_HARD_MAX;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer
     *
     * @return bool
     */
    public function isValid(SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer): bool
    {
        return !(($salesOrderThresholdValueTransfer->getValue() < 1 || $salesOrderThresholdValueTransfer->getFee()));
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer
     *
     * @return bool
     */
    public function isApplicable(SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer): bool
    {
        return $salesOrderThresholdValueTransfer->getValue() > $salesOrderThresholdValueTransfer->getThreshold();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer
     *
     * @return int|null
     */
    public function calculateFee(SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfer): ?int
    {
        return null;
    }
}
