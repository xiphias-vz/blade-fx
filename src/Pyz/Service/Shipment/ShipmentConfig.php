<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment;

use Spryker\Service\Kernel\AbstractBundleConfig;

/**
 * @method \Pyz\Shared\Shipment\ShipmentConfig getSharedConfig()
 */
class ShipmentConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getGuestCustomerClickAndCollectShipmentMethodPrice(): int
    {
        return $this->getSharedConfig()->getGuestCustomerClickAndCollectShipmentMethodPrice();
    }

    /**
     * @return int
     */
    public function getMainGlobusCustomerClickAndCollectShipmentMethodPrice(): int
    {
        return $this->getSharedConfig()->getMainGlobusCustomerClickAndCollectShipmentMethodPrice();
    }

    /**
     * @return int
     */
    public function getPromotionClickAndCollectShipmentMethodPrice(): int
    {
        return $this->getSharedConfig()->getPromotionClickAndCollectShipmentMethodPrice();
    }
}
