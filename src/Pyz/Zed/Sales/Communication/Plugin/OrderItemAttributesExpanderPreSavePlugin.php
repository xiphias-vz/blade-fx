<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 */
class OrderItemAttributesExpanderPreSavePlugin extends AbstractPlugin implements OrderItemExpanderPreSavePluginInterface
{
    public const DEFAULT_PRICE_MULTIPLICATION = 100;

    /**
     * {@inheritDoc}
     * Specification:
     *  - Allows to manipulate SpySalesOrderItemEntity transfer object data before storing in Persistence.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $salesOrderItemEntity
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer
     */
    public function expandOrderItem(
        QuoteTransfer $quoteTransfer,
        ItemTransfer $itemTransfer,
        SpySalesOrderItemEntityTransfer $salesOrderItemEntity
    ): SpySalesOrderItemEntityTransfer {
        $salesOrderItemEntity->setSapWgr($itemTransfer->getSapWgr());
        $salesOrderItemEntity->setBontext($itemTransfer->getBontext());
        $salesOrderItemEntity->setWeightPerUnit($itemTransfer->getWeightPerUnit());
        $salesOrderItemEntity->setPricePerKg($itemTransfer->getPricePerKg());
        $salesOrderItemEntity->setBrand($itemTransfer->getBrand());
        $salesOrderItemEntity->setBasePriceContent($itemTransfer->getBasePriceContent() * self::DEFAULT_PRICE_MULTIPLICATION);
        $salesOrderItemEntity->setBasePriceUnit($itemTransfer->getBasePriceUnit());

        return $salesOrderItemEntity;
    }
}
