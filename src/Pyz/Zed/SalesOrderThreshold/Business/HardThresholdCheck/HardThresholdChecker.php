<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business\HardThresholdCheck;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SalesOrderThresholdValueTransfer;
use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Spryker\Zed\SalesOrderThreshold\Business\HardThresholdCheck\HardThresholdChecker as SprykerHardThresholdChecker;

class HardThresholdChecker extends SprykerHardThresholdChecker
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return bool
     */
    public function checkQuoteForHardThreshold(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer): bool
    {
        $salesOrderThresholdValueTransfers = $this->salesOrderThresholdDataSourceStrategyResolver->findApplicableThresholds($quoteTransfer);

        $salesOrderThresholdValueTransfers = $this->filterSalesOrderThresholdsByThresholdGroups(
            $salesOrderThresholdValueTransfers,
            [
                SalesOrderThresholdConfig::GROUP_HARD,
                SalesOrderThresholdConfig::GROUP_HARD_MAX,
            ]
        );

        if (empty($salesOrderThresholdValueTransfers)) {
            return true;
        }

        foreach ($salesOrderThresholdValueTransfers as $salesOrderThresholdValueTransfer) {
            $this->addErrorMessageToCheckoutResponse($checkoutResponseTransfer, $quoteTransfer->getCurrency(), $salesOrderThresholdValueTransfer);
        }

        if ($checkoutResponseTransfer->getErrors()->count() > 0) {
            $checkoutResponseTransfer->setIsSuccess(false)
                ->setIsExternalRedirect(true)
                ->setRedirectUrl(static::CHECKOUT_ERROR_REDIRECT);

            return false;
        }

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer[] $salesOrderThresholdValueTransfers
     * @param string[] $thresholdGroups
     *
     * @return \Generated\Shared\Transfer\SalesOrderThresholdValueTransfer[]
     */
    protected function filterSalesOrderThresholdsByThresholdGroups(array $salesOrderThresholdValueTransfers, array $thresholdGroups): array
    {
        return array_filter($salesOrderThresholdValueTransfers, function (SalesOrderThresholdValueTransfer $salesOrderThresholdValueTransfers) use ($thresholdGroups) {
            return in_array($salesOrderThresholdValueTransfers->getSalesOrderThresholdType()->getThresholdGroup(), $thresholdGroups);
        });
    }
}
