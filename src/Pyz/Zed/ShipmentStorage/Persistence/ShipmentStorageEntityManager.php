<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Persistence;

use Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer;
use Orm\Zed\Shipment\Persistence\Map\SpyShipmentCarrierTableMap;
use Orm\Zed\Shipment\Persistence\Map\SpyShipmentMethodPriceTableMap;
use Orm\Zed\Shipment\Persistence\Map\SpyShipmentMethodTableMap;
use Orm\Zed\ShipmentStorage\Persistence\PyzShipmentMethodsListStorage;
use Orm\Zed\Store\Persistence\Map\SpyStoreTableMap;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStoragePersistenceFactory getFactory()
 */
class ShipmentStorageEntityManager extends AbstractEntityManager implements ShipmentStorageEntityManagerInterface
{
    public const STORE_NAME_COLUMN = 'storeName';
    public const CARRIER_NAME_COLUMN = 'carrierName';
    public const SHIPMENT_METHOD_NAME_COLUMN = 'shipmentMethodName';
    public const SHIPMENT_METHOD_KEY_COLUMN = 'shipmentMethodKey';

    /**
     * @param int[] $shipmentMethodIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodIds(array $shipmentMethodIds): void
    {
        $shipmentMethodsStores = $this->getFactory()->createShipmentMethodQuery()
            ->filterByIdShipmentMethod_In($shipmentMethodIds)
            ->useShipmentMethodStoreQuery()
                ->joinWithStore()
                ->withColumn(SpyStoreTableMap::COL_NAME, static::STORE_NAME_COLUMN)
                ->groupBy(static::STORE_NAME_COLUMN)
            ->endUse()
            ->find()
            ->toArray();

        $storesToUpdate = array_map(function ($shipmentMethod) {
            /** @var \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethod */
            return $shipmentMethod[static::STORE_NAME_COLUMN];
        }, $shipmentMethodsStores);

        $this->updateStores($storesToUpdate);
    }

    /**
     * @param int[] $shipmentCarrierIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentCarrierIds(array $shipmentCarrierIds): void
    {
        $shipmentCarrierStores = $this->getFactory()->createShipmentCarrierQuery()
            ->filterByIdShipmentCarrier_In($shipmentCarrierIds)
            ->useShipmentMethodsQuery()
                ->useShipmentMethodStoreQuery()
                    ->joinWithStore()
                    ->withColumn(SpyStoreTableMap::COL_NAME, static::STORE_NAME_COLUMN)
                    ->groupBy(static::STORE_NAME_COLUMN)
                ->endUse()
            ->endUse()
            ->find()
            ->toArray();

        $storesToUpdate = array_map(function ($shipmentMethod) {
            /** @var \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethod */
            return $shipmentMethod[static::STORE_NAME_COLUMN];
        }, $shipmentCarrierStores);

        $this->updateStores($storesToUpdate);
    }

    /**
     * @param array $shipmentMethodStoreIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodStoreIds(array $shipmentMethodStoreIds): void
    {
        $shipmentMethodStores = $this->getFactory()->createShipmentMethodPriceQuery()
            ->filterByIdShipmentMethodPrice_In($shipmentMethodStoreIds)
            ->joinWithStore()
            ->withColumn(SpyStoreTableMap::COL_NAME, static::STORE_NAME_COLUMN)
            ->groupBy(static::STORE_NAME_COLUMN)
            ->find()
            ->toArray();

        $storesToUpdate = array_map(function ($shipmentMethod) {
            /** @var \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethod */
            return $shipmentMethod[static::STORE_NAME_COLUMN];
        }, $shipmentMethodStores);

        $this->updateStores($storesToUpdate);
    }

    /**
     * @param array $shipmentMethodStoreIds
     *
     * @return void
     */
    public function saveShipmentMethodsListByShipmentMethodPriceIds(array $shipmentMethodStoreIds): void
    {
        $shipmentMethodStores = $this->getFactory()->createShipmentMethodStoreQuery()
            ->filterByIdShipmentMethodStore_In($shipmentMethodStoreIds)
            ->joinWithStore()
            ->withColumn(SpyStoreTableMap::COL_NAME, static::STORE_NAME_COLUMN)
            ->groupBy(static::STORE_NAME_COLUMN)
            ->find()
            ->toArray();

        $storesToUpdate = array_map(function ($shipmentMethod) {
            /** @var \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethod */
            return $shipmentMethod[static::STORE_NAME_COLUMN];
        }, $shipmentMethodStores);

        $this->updateStores($storesToUpdate);
    }

    /**
     * @param string[] $storesToUpdate
     *
     * @return void
     */
    protected function updateStores(array $storesToUpdate): void
    {
        $currentShipmentMethodsListsByStore = $this->getFactory()
            ->createShipmentMethodsListStorageQuery()
            ->filterByStore_In($storesToUpdate)
            ->find()
            ->toKeyIndex('store');

        foreach ($storesToUpdate as $storeName) {
            if (isset($currentShipmentMethodsListsByStore[$storeName])) {
                /** @var \Orm\Zed\ShipmentStorage\Persistence\PyzShipmentMethodsListStorage $shipmentMethodsList */
                $shipmentMethodsList = $currentShipmentMethodsListsByStore[$storeName];
                $shipmentMethodsList->setData($this->getShipmentMethodData($storeName))->save();
                continue;
            }

            (new PyzShipmentMethodsListStorage())
                ->setStore($storeName)
                ->setData($this->getShipmentMethodData($storeName))
                ->save();
        }
    }

    /**
     * @param string $storeName
     *
     * @return array
     */
    protected function getShipmentMethodData(string $storeName): array
    {
        $shipmentMethods = $this->getFactory()->createShipmentMethodQuery()
            ->joinWithShipmentCarrier()
            ->joinWithShipmentMethodPrice()
            ->useShipmentMethodStoreQuery()
                ->joinWithStore()
                ->useStoreQuery()
                    ->filterByName($storeName)
                ->endUse()
            ->endUse()
            ->where(sprintf('%s = %s', SpyShipmentMethodPriceTableMap::COL_FK_STORE, SpyStoreTableMap::COL_ID_STORE))
            ->withColumn(SpyShipmentMethodTableMap::COL_NAME, static::SHIPMENT_METHOD_NAME_COLUMN)
            ->withColumn(SpyShipmentCarrierTableMap::COL_NAME, static::CARRIER_NAME_COLUMN)
            ->withColumn(SpyStoreTableMap::COL_NAME, static::STORE_NAME_COLUMN)
            ->withColumn(SpyShipmentMethodTableMap::COL_SHIPMENT_METHOD_KEY, static::SHIPMENT_METHOD_KEY_COLUMN)
            ->find();

        return $this->getFactory()
            ->createShipmentStorageMapper()
            ->mapShipmentMethodEntitiesToShipmentMethodsListStorageTransfer(
                $shipmentMethods,
                new ShipmentMethodsListStorageTransfer()
            )
            ->toArray();
    }
}
