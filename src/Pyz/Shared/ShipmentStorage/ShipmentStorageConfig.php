<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\ShipmentStorage;

class ShipmentStorageConfig
{
    public const SHIPMENT_METHODS_LIST_RESOURCE_NAME = 'shipment_methods_list';
    public const SHIPMENT_SYNC_STORAGE_QUEUE = 'sync.storage.shipment';
    public const SHIPMENT_SYNC_STORAGE_ERROR_QUEUE = 'sync.storage.shipment.error';

    public const SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_GROSS = 'gross_price';
    public const SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_NET = 'net_price';
}
