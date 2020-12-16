<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Exporter;

use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregatorInterface;
use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface;
use Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriterInterface;

class CashierOrderExporter implements CashierOrderExporterInterface
{
    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriterInterface
     */
    protected $cashierOrderWriter;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface
     */
    protected $cashierOrderContentBuilder;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregatorInterface
     */
    protected $orderItemAggregator;

    /**
     * @param \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderWriterInterface $cashierOrderWriter
     * @param \Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface $cashierOrderContentBuilder
     * @param \Pyz\Zed\CashierOrderExport\Business\Aggregator\OrderItemAggregatorInterface $orderItemAggregator
     */
    public function __construct(
        CashierOrderWriterInterface $cashierOrderWriter,
        CashierOrderContentBuilderInterface $cashierOrderContentBuilder,
        OrderItemAggregatorInterface $orderItemAggregator
    ) {
        $this->cashierOrderWriter = $cashierOrderWriter;
        $this->cashierOrderContentBuilder = $cashierOrderContentBuilder;
        $this->orderItemAggregator = $orderItemAggregator;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function exportOrders(OrderTransfer $orderTransfer): OrderTransfer
    {
        $orderTransfer = $this->orderItemAggregator->aggregateSplitItems($orderTransfer);

        if ($orderTransfer->getIsCashierExportSuccess()) {
            return $orderTransfer;
        }

        $content = $this->cashierOrderContentBuilder->prepareContent($orderTransfer);

        return $this->cashierOrderWriter->write($content, $orderTransfer);
    }
}
