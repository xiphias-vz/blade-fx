<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ShipmentStorage;

use Pyz\Client\ShipmentStorage\ShipmentStorage\ShipmentStorageReader;
use Pyz\Client\ShipmentStorage\ShipmentStorage\ShipmentStorageReaderInterface;
use Spryker\Client\Currency\CurrencyClientInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Price\PriceClientInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Shipment\ShipmentServiceInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class ShipmentStorageFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    public function getSynchronizationService(): SynchronizationServiceInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::SERVICE_SYNCHRONIZATION);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Spryker\Client\Currency\CurrencyClientInterface
     */
    public function getCurrencyClient(): CurrencyClientInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::CLIENT_CURRENCY);
    }

    /**
     * @return \Spryker\Client\Price\PriceClientInterface
     */
    public function getPriceClient(): PriceClientInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::CLIENT_PRICE);
    }

    /**
     * @return \Spryker\Service\Shipment\ShipmentServiceInterface
     */
    public function getShipmentService(): ShipmentServiceInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::SERVICE_SHIPMENT);
    }

    /**
     * @return \Pyz\Client\ShipmentStorage\ShipmentStorage\ShipmentStorageReaderInterface
     */
    public function createShipmentStorageReader(): ShipmentStorageReaderInterface
    {
        return new ShipmentStorageReader(
            $this->getSynchronizationService(),
            $this->getCurrencyClient(),
            $this->getStorageClient(),
            $this->getStoreClient(),
            $this->getPriceClient(),
            $this->getShipmentService()
        );
    }
}
