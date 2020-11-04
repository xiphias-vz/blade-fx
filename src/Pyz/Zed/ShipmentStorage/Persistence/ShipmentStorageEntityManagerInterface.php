<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Persistence;

interface ShipmentStorageEntityManagerInterface
{
    /**
     * @param int[] $shipmentMethodIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodIds(array $shipmentMethodIds): void;

    /**
     * @param int[] $shipmentCarrierIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentCarrierIds(array $shipmentCarrierIds): void;

    /**
     * @param int[] $shipmentMethodStoreIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodStoreIds(array $shipmentMethodStoreIds): void;

    /**
     * @param int[] $shipmentMethodPriceIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodPriceIds(array $shipmentMethodPriceIds): void;
}
