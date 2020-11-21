<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment;

use DateTime;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Service\Shipment\ShipmentService as SprykerShipmentService;

/**
 * @method \Pyz\Service\Shipment\ShipmentServiceFactory getFactory()
 */
class ShipmentService extends SprykerShipmentService implements ShipmentServiceInterface
{
    /**
     * @inheritDoc
     */
    public function parseRequestedDeliveryDate(string $requestedDeliveryDate): DateTime
    {
        return $this->getFactory()
            ->createDeliveryDateParser()
            ->parseRequestedDeliveryDate($requestedDeliveryDate);
    }

    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return int|null
     */
    public function resolveClickAndCollectShipmentPrice(QuoteTransfer $quoteTransfer): ?int
    {
        return $this->getFactory()
            ->createClickAndCollectShipmentPriceResolver()
            ->resolveShipmentPrice($quoteTransfer);
    }
}
