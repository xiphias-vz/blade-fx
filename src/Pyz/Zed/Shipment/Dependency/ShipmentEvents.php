<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Shipment\Dependency;

class ShipmentEvents
{
    public const SHIPMENT_METHODS_PUBLISH = 'Shipment.shipment.publish';
    public const ENTITY_SPY_SHIPMENT_METHOD_UPDATE = 'Entity.spy_shipment_method.update';
    public const ENTITY_SPY_SHIPMENT_METHOD_CREATE = 'Entity.spy_shipment_method.create';
    public const ENTITY_SPY_SHIPMENT_CARRIER_UPDATE = 'Entity.spy_shipment_carrier.update';
    public const ENTITY_SPY_SHIPMENT_STORE_CREATE = 'Entity.spy_shipment_method_store.create';
    public const ENTITY_SPY_SHIPMENT_STORE_UPDATE = 'Entity.spy_shipment_method_store.update';
    public const ENTITY_SPY_SHIPMENT_METHOD_PRICE_CREATE = 'Entity.spy_shipment_method_price.create';
    public const ENTITY_SPY_SHIPMENT_METHOD_PRICE_UPDATE = 'Entity.spy_shipment_method_price.update';
}
