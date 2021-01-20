<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AlternativeEan\Communication\Plugin;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface;

/**
 * @method \Pyz\Zed\AlternativeEan\Business\AlternativeEanFacadeInterface getFacade()
 * @method \Pyz\Zed\AlternativeEan\Persistence\AlternativeEanRepository getRepository()
 * @method \Pyz\Zed\AlternativeEan\Communication\AlternativeEanCommunicationFactory getFactory()
 * @method \Pyz\Zed\AlternativeEan\AlternativeEanConfig getConfig()
 */
class OrderItemAlternativeEanExpanderPreSavePlugin extends AbstractPlugin implements OrderItemExpanderPreSavePluginInterface
{
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
        $alternativeEanList = $this->getRepository()->getAlternativeEansByEan($itemTransfer->getProductNumber());
        $salesOrderItemEntity->setAlternativeEan(implode(',', $alternativeEanList));

        return $salesOrderItemEntity;
    }
}
