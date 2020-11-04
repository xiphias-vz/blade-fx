<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Persistence\Propel;

use ArrayObject;
use Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer;
use Generated\Shared\Transfer\ShipmentMethodStorageTransfer;
use Propel\Runtime\Collection\ObjectCollection;
use Pyz\Shared\ShipmentStorage\ShipmentStorageConfig;
use Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManager;

class ShipmentStorageMapper
{
    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Shipment\Persistence\SpyShipmentMethod[] $shipmentMethodEntities
     * @param \Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer $shipmentMethodsListStorageTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer
     */
    public function mapShipmentMethodEntitiesToShipmentMethodsListStorageTransfer(
        ObjectCollection $shipmentMethodEntities,
        ShipmentMethodsListStorageTransfer $shipmentMethodsListStorageTransfer
    ): ShipmentMethodsListStorageTransfer {
        $shipmentMethods = new ArrayObject();
        foreach ($shipmentMethodEntities as $shipmentMethodEntity) {
            $shipmentMethodTransfer = new ShipmentMethodStorageTransfer();
            $shipmentMethodTransfer->setIdShipmentMethod($shipmentMethodEntity->getIdShipmentMethod())
                ->setName($shipmentMethodEntity->getVirtualColumn(ShipmentStorageEntityManager::SHIPMENT_METHOD_NAME_COLUMN))
                ->setCarrierName($shipmentMethodEntity->getVirtualColumn(ShipmentStorageEntityManager::CARRIER_NAME_COLUMN))
                ->setShipmentMethodKey($shipmentMethodEntity->getVirtualColumn(ShipmentStorageEntityManager::SHIPMENT_METHOD_KEY_COLUMN));

            $shipmentMethodPrices = $shipmentMethodEntity->getShipmentMethodPrices();
            $currencyMap = [];

            foreach ($shipmentMethodPrices as $shipmentMethodPrice) {
                $currencyMap[$shipmentMethodPrice->getCurrency()->getCode()] = [
                    ShipmentStorageConfig::SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_GROSS => $shipmentMethodPrice->getDefaultGrossPrice(),
                    ShipmentStorageConfig::SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_NET => $shipmentMethodPrice->getDefaultNetPrice(),
                ];
            }

            $shipmentMethodTransfer->setCurrencyPriceMap($currencyMap);
            $shipmentMethods[] = $shipmentMethodTransfer;
        }

        $shipmentMethodsListStorageTransfer->setShipmentMethods($shipmentMethods);

        return $shipmentMethodsListStorageTransfer;
    }
}
