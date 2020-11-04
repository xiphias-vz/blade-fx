<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business\Expander;

use Generated\Shared\Transfer\CurrencyTransfer;
use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\MoneyTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Pyz\Zed\SalesOrderThreshold\Business\Filter\SalesOrderThresholdFilterInterface;
use Spryker\Zed\SalesOrderThreshold\Business\DataSource\SalesOrderThresholdDataSourceStrategyResolverInterface;
use Spryker\Zed\SalesOrderThreshold\Business\Strategy\Resolver\SalesOrderThresholdStrategyResolverInterface;
use Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMessengerFacadeInterface;
use Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMoneyFacadeInterface;

class ThresholdQuoteExpander implements ThresholdQuoteExpanderInterface
{
    protected const THRESHOLD_GLOSSARY_PARAMETER = '{{threshold}}';

    /**
     * @var \Spryker\Zed\SalesOrderThreshold\Business\Strategy\Resolver\SalesOrderThresholdStrategyResolverInterface
     */
    protected $salesOrderThresholdStrategyResolver;

    /**
     * @var \Pyz\Zed\SalesOrderThreshold\Business\Filter\SalesOrderThresholdFilterInterface
     */
    protected $salesOrderThresholdFilter;

    /**
     * @var \Spryker\Zed\SalesOrderThreshold\Business\DataSource\SalesOrderThresholdDataSourceStrategyResolverInterface
     */
    protected $salesOrderThresholdDataSourceStrategyResolver;

    /**
     * @var \Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMessengerFacadeInterface
     */
    protected $messengerFacade;

    /**
     * @var \Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMoneyFacadeInterface
     */
    protected $moneyFacade;

    /**
     * @param \Spryker\Zed\SalesOrderThreshold\Business\DataSource\SalesOrderThresholdDataSourceStrategyResolverInterface $salesOrderThresholdDataSourceStrategyResolver
     * @param \Spryker\Zed\SalesOrderThreshold\Business\Strategy\Resolver\SalesOrderThresholdStrategyResolverInterface $salesOrderThresholdStrategyResolver
     * @param \Pyz\Zed\SalesOrderThreshold\Business\Filter\SalesOrderThresholdFilterInterface $salesOrderThresholdFilter
     * @param \Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMessengerFacadeInterface $messengerFacade
     * @param \Spryker\Zed\SalesOrderThreshold\Dependency\Facade\SalesOrderThresholdToMoneyFacadeInterface $moneyFacade
     */
    public function __construct(
        SalesOrderThresholdDataSourceStrategyResolverInterface $salesOrderThresholdDataSourceStrategyResolver,
        SalesOrderThresholdStrategyResolverInterface $salesOrderThresholdStrategyResolver,
        SalesOrderThresholdFilterInterface $salesOrderThresholdFilter,
        SalesOrderThresholdToMessengerFacadeInterface $messengerFacade,
        SalesOrderThresholdToMoneyFacadeInterface $moneyFacade
    ) {
        $this->salesOrderThresholdStrategyResolver = $salesOrderThresholdStrategyResolver;
        $this->salesOrderThresholdFilter = $salesOrderThresholdFilter;
        $this->salesOrderThresholdDataSourceStrategyResolver = $salesOrderThresholdDataSourceStrategyResolver;
        $this->messengerFacade = $messengerFacade;
        $this->moneyFacade = $moneyFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $isHardThresholdReached = $this->isThresholdReached($quoteTransfer, SalesOrderThresholdConfig::GROUP_HARD);

        return $quoteTransfer
            ->setIsHardThresholdReached($isHardThresholdReached);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandWithHardMaxThresholdReached(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $isHardMaxThresholdReached = $this->isThresholdReached($quoteTransfer, SalesOrderThresholdConfig::GROUP_HARD_MAX);

        return $quoteTransfer
            ->setIsHardMaxThresholdReached($isHardMaxThresholdReached);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param string $thresholdGroup
     *
     * @return bool
     */
    protected function isThresholdReached(QuoteTransfer $quoteTransfer, string $thresholdGroup): bool
    {
        $salesOrderThresholdValueTransfers = $this->salesOrderThresholdFilter->filterSalesOrderThresholdsByThresholdGroup(
            $this->salesOrderThresholdDataSourceStrategyResolver->findApplicableThresholds($quoteTransfer),
            $thresholdGroup
        );

        foreach ($salesOrderThresholdValueTransfers as $salesOrderThresholdValueTransfer) {
            $salesOrderThresholdStrategy = $this->salesOrderThresholdStrategyResolver->resolveSalesOrderThresholdStrategy(
                $salesOrderThresholdValueTransfer->getSalesOrderThresholdType()->getKey()
            );

            if (!$salesOrderThresholdStrategy->isApplicable($salesOrderThresholdValueTransfer)) {
                continue;
            }

            $thresholdMessage = $this->createMessageTransfer(
                $salesOrderThresholdValueTransfer->getMessageGlossaryKey(),
                (string)$salesOrderThresholdValueTransfer->getThreshold(),
                $quoteTransfer->getCurrency()
            );

            $this->messengerFacade->addInfoMessage($thresholdMessage);

            return true;
        }

        return false;
    }

    /**
     * @param string $messageGlossaryKey
     * @param string $threshold
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return \Generated\Shared\Transfer\MessageTransfer
     */
    protected function createMessageTransfer(
        string $messageGlossaryKey,
        string $threshold,
        CurrencyTransfer $currencyTransfer
    ): MessageTransfer {
        $messageParams = [
            static::THRESHOLD_GLOSSARY_PARAMETER => $this->moneyFacade->formatWithSymbol(
                $this->createMoneyTransfer($threshold, $currencyTransfer)
            ),
        ];

        return (new MessageTransfer())
            ->setValue($messageGlossaryKey)
            ->setParameters($messageParams);
    }

    /**
     * @param string $moneyValue
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return \Generated\Shared\Transfer\MoneyTransfer
     */
    protected function createMoneyTransfer(
        string $moneyValue,
        CurrencyTransfer $currencyTransfer
    ): MoneyTransfer {
        return (new MoneyTransfer())
            ->setAmount($moneyValue)
            ->setCurrency($currencyTransfer);
    }
}
