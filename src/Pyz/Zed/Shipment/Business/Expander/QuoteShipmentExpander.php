<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Shipment\Business\Expander;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Shipment\Business\Expander\QuoteShipmentExpander as SprykerQuoteShipmentExpander;

class QuoteShipmentExpander extends SprykerQuoteShipmentExpander
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandQuoteWithShipmentGroups(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $quoteTransfer = parent::expandQuoteWithShipmentGroups($quoteTransfer);

        $shipmentTransfer = $quoteTransfer->getShipment();
        $shipmentTransfer->setShipmentMethodKey($shipmentTransfer->getMethod()->getShipmentMethodKey());
        $shipmentTransfer->setMerchantReference($quoteTransfer->getMerchantReference());

        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $itemTransfer->getShipment()->setShipmentMethodKey($itemTransfer->getShipment()->getMethod()->getShipmentMethodKey());
            $itemTransfer->getShipment()->setMerchantReference($quoteTransfer->getMerchantReference());
        }

        return $quoteTransfer;
    }
}
