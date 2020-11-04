<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ShipmentStorage\ShipmentStorage;

use Generated\Shared\Transfer\CurrencyTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer;
use Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer;
use Generated\Shared\Transfer\ShipmentMethodStorageTransfer;
use Generated\Shared\Transfer\ShipmentMethodsTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Shared\ShipmentStorage\ShipmentStorageConfig;
use Spryker\Client\Currency\CurrencyClientInterface;
use Spryker\Client\Price\PriceClientInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Shipment\ShipmentServiceInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;
use Spryker\Shared\Price\PriceConfig;

class ShipmentStorageReader implements ShipmentStorageReaderInterface
{
    /**
     * @var \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    protected $synchronizationService;

    /**
     * @var \Spryker\Client\Currency\CurrencyClientInterface
     */
    protected $currencyClient;

    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    protected $storageClient;

    /**
     * @var \Spryker\Client\Store\StoreClientInterface
     */
    protected $storeClient;

    /**
     * @var \Spryker\Client\Price\PriceClientInterface
     */
    protected $priceClient;

    /**
     * @var \Spryker\Service\Shipment\ShipmentServiceInterface
     */
    protected $shipmentService;

    /**
     * @param \Spryker\Service\Synchronization\SynchronizationServiceInterface $synchronizationService
     * @param \Spryker\Client\Currency\CurrencyClientInterface $currencyClient
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     * @param \Spryker\Client\Price\PriceClientInterface $priceClient
     * @param \Spryker\Service\Shipment\ShipmentServiceInterface $shipmentService
     */
    public function __construct(
        SynchronizationServiceInterface $synchronizationService,
        CurrencyClientInterface $currencyClient,
        StorageClientInterface $storageClient,
        StoreClientInterface $storeClient,
        PriceClientInterface $priceClient,
        ShipmentServiceInterface $shipmentService
    ) {
        $this->synchronizationService = $synchronizationService;
        $this->currencyClient = $currencyClient;
        $this->storageClient = $storageClient;
        $this->storeClient = $storeClient;
        $this->priceClient = $priceClient;
        $this->shipmentService = $shipmentService;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer
     */
    public function getShipmentMethodsCollectionTransfer(QuoteTransfer $quoteTransfer): ShipmentMethodsCollectionTransfer
    {
        $currentStore = $this->storeClient->getCurrentStore();
        $currentCurrency = $this->currencyClient->getCurrent();
        $currentPriceMode = $this->priceClient->getCurrentPriceMode();

        $shipmentMethodsCollectionTransfer = new ShipmentMethodsCollectionTransfer();
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($currentStore->getName());
        $key = $this->synchronizationService
            ->getStorageKeyBuilder(ShipmentStorageConfig::SHIPMENT_METHODS_LIST_RESOURCE_NAME)
            ->generateKey($synchronizationDataTransfer);

        $storageShipmentMethods = $this->storageClient->get($key);
        $shipmentMethodsListStorageTransfer = (new ShipmentMethodsListStorageTransfer())
            ->fromArray($storageShipmentMethods, true);

        if ($storageShipmentMethods) {
            $shipmentMethodsTransfer = $this->mapStorageShipmentMethodsToShipmentMethodsTransfer(
                $shipmentMethodsListStorageTransfer,
                $currentCurrency,
                $currentPriceMode
            );

            //since there is no split delivery, this will always be one hash
            $shipmentGroupCollection = $this->shipmentService->groupItemsByShipment($quoteTransfer->getItems());

            foreach ($shipmentGroupCollection as $shipmentGroupTransfer) {
                $shipmentMethodsTransfer->setShipmentHash($shipmentGroupTransfer->getHash());
                $shipmentMethodsCollectionTransfer->addShipmentMethods($shipmentMethodsTransfer);
            }
        }

        return $shipmentMethodsCollectionTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodStorageTransfer $shipmentMethodStorageTransfer
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currentCurrency
     * @param string $currentPriceMode
     *
     * @return int
     */
    protected function getStoreCurrencyPriceFromShipmentMethodStorageTransfer(
        ShipmentMethodStorageTransfer $shipmentMethodStorageTransfer,
        CurrencyTransfer $currentCurrency,
        string $currentPriceMode
    ): int {
        $currencyPriceMap = $shipmentMethodStorageTransfer->getCurrencyPriceMap();

        if (!isset($currencyPriceMap[$currentCurrency->getCode()])) {
            return 0;
        }

        if ($currentPriceMode === PriceConfig::PRICE_MODE_GROSS) {
            return $currencyPriceMap[$currentCurrency->getCode()][ShipmentStorageConfig::SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_GROSS];
        }

        return $currencyPriceMap[$currentCurrency->getCode()][ShipmentStorageConfig::SHIPMENT_METHOD_PRICE_TYPE_IDENTIFIER_NET];
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodsListStorageTransfer $shipmentMethodsListStorageTransfer
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currentCurrency
     * @param string $currentPriceMode
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsTransfer
     */
    protected function mapStorageShipmentMethodsToShipmentMethodsTransfer(
        ShipmentMethodsListStorageTransfer $shipmentMethodsListStorageTransfer,
        CurrencyTransfer $currentCurrency,
        string $currentPriceMode
    ): ShipmentMethodsTransfer {
        $shipmentMethodTransfers = new ShipmentMethodsTransfer();
        foreach ($shipmentMethodsListStorageTransfer->getShipmentMethods() as $shipmentMethodStorageTransfer) {
            $shipmentMethodTransfer = new ShipmentMethodTransfer();
            $shipmentMethodTransfer->setCarrierName($shipmentMethodStorageTransfer->getCarrierName())
                ->setIdShipmentMethod($shipmentMethodStorageTransfer->getIdShipmentMethod())
                ->setName($shipmentMethodStorageTransfer->getName())
                ->setShipmentMethodKey($shipmentMethodStorageTransfer->getShipmentMethodKey());

            $shipmentMethodTransfer->setStoreCurrencyPrice(
                $this->getStoreCurrencyPriceFromShipmentMethodStorageTransfer(
                    $shipmentMethodStorageTransfer,
                    $currentCurrency,
                    $currentPriceMode
                )
            );

            $shipmentMethodTransfers->addMethod($shipmentMethodTransfer);
        }

        return $shipmentMethodTransfers;
    }
}
