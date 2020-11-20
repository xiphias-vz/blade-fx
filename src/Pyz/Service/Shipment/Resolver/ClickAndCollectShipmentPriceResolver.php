<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment\Resolver;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Service\Shipment\ShipmentConfig;

class ClickAndCollectShipmentPriceResolver implements ShipmentPriceResolverInterface
{
    /**
     * @var \Pyz\Service\Shipment\ShipmentConfig
     */
    protected $shipmentConfig;

    /**
     * @param \Pyz\Service\Shipment\ShipmentConfig $shipmentConfig
     */
    public function __construct(ShipmentConfig $shipmentConfig)
    {
        $this->shipmentConfig = $shipmentConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return int|null
     */
    public function resolveShipmentPrice(QuoteTransfer $quoteTransfer): ?int
    {
        if (!$quoteTransfer->getCustomer()->getHasOrders()) {
            return $this->shipmentConfig->getPromotionClickAndCollectShipmentMethodPrice();
        }

        if ($quoteTransfer->getCustomer()->getThirdPartyRegistration()) {
            return $this->shipmentConfig->getMainGlobusCustomerClickAndCollectShipmentMethodPrice();
        }

        return null;
    }
}
