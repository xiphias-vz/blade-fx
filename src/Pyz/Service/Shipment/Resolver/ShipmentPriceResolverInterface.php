<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment\Resolver;

use Generated\Shared\Transfer\QuoteTransfer;

interface ShipmentPriceResolverInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return int|null
     */
    public function resolveShipmentPrice(QuoteTransfer $quoteTransfer): ?int;
}
