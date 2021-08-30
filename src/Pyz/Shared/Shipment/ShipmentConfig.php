<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Shipment;

use Spryker\Shared\Config\Config;
use Spryker\Shared\Shipment\ShipmentConfig as SprykerShipmentConfig;

class ShipmentConfig extends SprykerShipmentConfig
{
    public const SHIPMENT_METHOD_CLICK_AND_COLLECT = 'click_and_collect';
    public const SHIPMENT_METHOD_DELIVERY = 'lieferung';
    public const PROMOTION_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE = 0;

    /**
     * @return bool
     */
    public function isMultiShipmentSelectionEnabled(): bool
    {
        return false;
    }

    /**
     * @return int
     */
    public function getGuestCustomerClickAndCollectShipmentMethodPrice(): int
    {
        return Config::get(ShipmentConstants::GUEST_CUSTOMER_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE);
    }

    /**
     * @return int
     */
    public function getMainGlobusCustomerClickAndCollectShipmentMethodPrice(): int
    {
        return Config::get(ShipmentConstants::MAIN_GLOBUS_CUSTOMER_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE);
    }

    /**
     * @return int
     */
    public function getPromotionClickAndCollectShipmentMethodPrice(): int
    {
        return static::PROMOTION_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE;
    }
}
