<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Persistence;

use Orm\Zed\Shipment\Persistence\SpyShipmentCarrierQuery;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodPriceQuery;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodQuery;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodStoreQuery;
use Orm\Zed\ShipmentStorage\Persistence\PyzShipmentMethodsListStorageQuery;
use Pyz\Zed\ShipmentStorage\Persistence\Propel\ShipmentStorageMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface getEntityManager()
 */
class ShipmentStoragePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Shipment\Persistence\SpyShipmentMethodQuery
     */
    public function createShipmentMethodQuery(): SpyShipmentMethodQuery
    {
        return SpyShipmentMethodQuery::create();
    }

    /**
     * @return \Orm\Zed\Shipment\Persistence\SpyShipmentCarrierQuery
     */
    public function createShipmentCarrierQuery(): SpyShipmentCarrierQuery
    {
        return SpyShipmentCarrierQuery::create();
    }

    /**
     * @return \Orm\Zed\Shipment\Persistence\SpyShipmentMethodStoreQuery
     */
    public function createShipmentMethodStoreQuery(): SpyShipmentMethodStoreQuery
    {
        return SpyShipmentMethodStoreQuery::create();
    }

    /**
     * @return \Orm\Zed\Shipment\Persistence\SpyShipmentMethodPriceQuery
     */
    public function createShipmentMethodPriceQuery(): SpyShipmentMethodPriceQuery
    {
        return SpyShipmentMethodPriceQuery::create();
    }

    /**
     * @return \Pyz\Zed\ShipmentStorage\Persistence\Propel\ShipmentStorageMapper
     */
    public function createShipmentStorageMapper(): ShipmentStorageMapper
    {
        return new ShipmentStorageMapper();
    }

    /**
     * @return \Orm\Zed\ShipmentStorage\Persistence\PyzShipmentMethodsListStorageQuery
     */
    public function createShipmentMethodsListStorageQuery(): PyzShipmentMethodsListStorageQuery
    {
        return PyzShipmentMethodsListStorageQuery::create();
    }
}
