<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment;

use DateTime;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Service\Shipment\ShipmentServiceInterface as SprykerShipmentServiceInterface;

interface ShipmentServiceInterface extends SprykerShipmentServiceInterface
{
    /**
     * Specification:
     * - Parses requested delivery date string into DateTime object in store's timezone
     *
     * @api
     *
     * @param string $requestedDeliveryDate
     *
     * @return \DateTime
     */
    public function parseRequestedDeliveryDate(string $requestedDeliveryDate): DateTime;

    /**
     * Specification:
     * - Checks for `hasOrders` and `thirdPartyRegistration` customer flags.
     * - Applies custom logic if flags exists.
     * - Returns null otherwise.
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return int|null
     */
    public function resolveClickAndCollectShipmentPrice(QuoteTransfer $quoteTransfer): ?int;
}
