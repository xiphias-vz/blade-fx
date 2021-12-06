<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Sales\Business\Model\Order\SalesOrderSaver as SprykerSalesOrderSaver;

class SalesOrderSaver extends SprykerSalesOrderSaver
{
    /**
     * @var \Pyz\Zed\Sales\SalesConfig
     */
    protected $salesConfiguration;

    /**
     * @var int|null
     */
    protected $omsProcessWorkerNumber;

    /**
     * @var int|null
     */
    protected $omsProcessNumber;

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return void
     */
    public function saveOrderSales(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer)
    {
        if ($this->omsProcessWorkerNumber === null) {
            $this->omsProcessWorkerNumber = $this->salesConfiguration->getOmsProcessWorkerNumber();
        }

        $this->omsProcessNumber = rand(1, $this->omsProcessWorkerNumber);

        parent::saveOrderSales($quoteTransfer, $saveOrderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrder
     */
    protected function saveOrderEntity(QuoteTransfer $quoteTransfer)
    {
        $salesOrderEntity = $this->createSalesOrderEntity();
        $this->hydrateSalesOrderEntity($quoteTransfer, $salesOrderEntity);
        $this->hydrateAddresses($quoteTransfer, $salesOrderEntity);
        $this->addLocale($salesOrderEntity);
        $salesOrderEntity->setIsSubstitutionAllowed($quoteTransfer->getIsSubstitutionAllowed());
        $salesOrderEntity->save();

        return $salesOrderEntity;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $salesOrderItemEntity
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return void
     */
    protected function hydrateSalesOrderItemEntity(SpySalesOrder $salesOrderEntity, QuoteTransfer $quoteTransfer, SpySalesOrderItem $salesOrderItemEntity, ItemTransfer $itemTransfer)
    {
        parent::hydrateSalesOrderItemEntity($salesOrderEntity, $quoteTransfer, $salesOrderItemEntity, $itemTransfer);

        $itemsCount = count($quoteTransfer->getItems()->getArrayCopy());
        if ($itemsCount > 100 && $itemsCount < 200) {
            $salesOrderItemEntity->setOmsProcessorId(11);
        } elseif ($itemsCount > 200) {
            $salesOrderItemEntity->setOmsProcessorId(12);
        } else {
            $salesOrderItemEntity->setOmsProcessorId($this->omsProcessNumber);
        }

        $salesOrderItemEntity->setOmsProcessorId($this->omsProcessNumber);
        $salesOrderItemEntity->setStore($salesOrderEntity->getStore());
    }
}
