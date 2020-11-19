<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Shipment\Business\ShipmentMethod;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentGroupTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Spryker\Zed\Shipment\Business\ShipmentMethod\MethodPriceReader as SprykerMethodPriceReader;
use Spryker\Zed\Shipment\Dependency\Facade\ShipmentToCurrencyInterface;
use Spryker\Zed\Shipment\Dependency\Facade\ShipmentToStoreInterface;
use Spryker\Zed\Shipment\Persistence\ShipmentRepositoryInterface;

class MethodPriceReader extends SprykerMethodPriceReader
{
    /**
     * @var \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    protected $shipmentService;

    /**
     * @param \Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodPricePluginInterface[] $shipmentMethodPricePlugins
     * @param \Spryker\Zed\Shipment\Dependency\Facade\ShipmentToStoreInterface $storeFacade
     * @param \Spryker\Zed\Shipment\Persistence\ShipmentRepositoryInterface $shipmentRepository
     * @param \Spryker\Zed\Shipment\Dependency\Facade\ShipmentToCurrencyInterface $currencyFacade
     * @param \Pyz\Service\Shipment\ShipmentServiceInterface $shipmentService
     */
    public function __construct(
        array $shipmentMethodPricePlugins,
        ShipmentToStoreInterface $storeFacade,
        ShipmentRepositoryInterface $shipmentRepository,
        ShipmentToCurrencyInterface $currencyFacade,
        ShipmentServiceInterface $shipmentService
    ) {
        parent::__construct($shipmentMethodPricePlugins, $storeFacade, $shipmentRepository, $currencyFacade);

        $this->shipmentMethodPricePlugins = $shipmentMethodPricePlugins;
        $this->storeFacade = $storeFacade;
        $this->shipmentRepository = $shipmentRepository;
        $this->currencyFacade = $currencyFacade;
        $this->shipmentService = $shipmentService;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\ShipmentGroupTransfer|null $shipmentGroupTransfer
     *
     * @return int|null
     */
    public function findShipmentGroupShippingPrice(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        QuoteTransfer $quoteTransfer,
        ?ShipmentGroupTransfer $shipmentGroupTransfer = null
    ): ?int {
        $clickAndCollectShipmentPrice = $this->shipmentService->resolveClickAndCollectShipmentPrice($quoteTransfer);

        if ($clickAndCollectShipmentPrice !== null) {
            return $clickAndCollectShipmentPrice;
        }

        if (!$this->isSetPricePlugin($shipmentMethodTransfer)) {
            return $this->findShipmentMethodPriceValue($shipmentMethodTransfer, $quoteTransfer);
        }

        if ($shipmentGroupTransfer === null) {
            return null;
        }

        return $this->getPricePluginValue($shipmentMethodTransfer, $shipmentGroupTransfer, $quoteTransfer);
    }
}
