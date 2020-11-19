<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Form\DataProvider;

use ArrayObject;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer;
use Generated\Shared\Transfer\ShipmentMethodsTransfer;
use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Shared\Money\Dependency\Plugin\MoneyPluginInterface;
use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToGlossaryStorageClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToProductBundleClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToShipmentClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface;
use SprykerShop\Yves\CheckoutPage\Form\DataProvider\ShipmentFormDataProvider as SprykerShipmentFormDataProvider;
use SprykerShop\Yves\CheckoutPage\Form\Steps\ShipmentCollectionForm;

class ShipmentFormDataProvider extends SprykerShipmentFormDataProvider
{
    /**
     * @var \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    protected $timeSlotClient;

    /**
     * @var \SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface
     */
    protected $shipmentService;

    /**
     * @var \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    protected $pyzShipmentService;

    /**
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToShipmentClientInterface $shipmentClient
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToGlossaryStorageClientInterface $glossaryStorageClient
     * @param \Spryker\Shared\Kernel\Store $store
     * @param \Spryker\Shared\Money\Dependency\Plugin\MoneyPluginInterface $moneyPlugin
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface $shipmentService
     * @param \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig $checkoutPageConfig
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToProductBundleClientInterface $productBundleClient
     * @param \Pyz\Client\TimeSlot\TimeSlotClientInterface $timeSlotClient
     * @param \Pyz\Service\Shipment\ShipmentServiceInterface $pyzShipmentService
     */
    public function __construct(
        CheckoutPageToShipmentClientInterface $shipmentClient,
        CheckoutPageToGlossaryStorageClientInterface $glossaryStorageClient,
        Store $store,
        MoneyPluginInterface $moneyPlugin,
        CheckoutPageToShipmentServiceInterface $shipmentService,
        CheckoutPageConfig $checkoutPageConfig,
        CheckoutPageToProductBundleClientInterface $productBundleClient,
        TimeSlotClientInterface $timeSlotClient,
        ShipmentServiceInterface $pyzShipmentService
    ) {
        parent::__construct(
            $shipmentClient,
            $glossaryStorageClient,
            $store,
            $moneyPlugin,
            $shipmentService,
            $checkoutPageConfig,
            $productBundleClient
        );

        $this->timeSlotClient = $timeSlotClient;
        $this->pyzShipmentService = $pyzShipmentService;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getOptions(AbstractTransfer $quoteTransfer)
    {
        $options = parent::getOptions($quoteTransfer);
        $availableShipmentMethodsCollectionTransfer = $this->getAvailableShipmentMethodsByShipment($quoteTransfer);
        $shipmentGroups = $this->expandShipmentGroupsWithTimeSlot(
            $availableShipmentMethodsCollectionTransfer,
            $options[ShipmentCollectionForm::OPTION_SHIPMENT_GROUPS]
        );

        $options[ShipmentCollectionForm::OPTION_SHIPMENT_GROUPS] = $shipmentGroups;

        return $options;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer
     */
    protected function getAvailableShipmentMethodsByShipment(QuoteTransfer $quoteTransfer): ShipmentMethodsCollectionTransfer
    {
        $shipmentMethods = $this->shipmentClient->getAvailableMethodsByShipment($quoteTransfer);

        return $this->applyClickAndCollectShipmentPrice($quoteTransfer, $shipmentMethods);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer $shipmentMethodsCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer
     */
    protected function applyClickAndCollectShipmentPrice(
        QuoteTransfer $quoteTransfer,
        ShipmentMethodsCollectionTransfer $shipmentMethodsCollectionTransfer
    ): ShipmentMethodsCollectionTransfer {
        foreach ($shipmentMethodsCollectionTransfer->getShipmentMethods() as $shipmentMethodsTransfer) {
            foreach ($shipmentMethodsTransfer->getMethods() as $shipmentMethodTransfer) {
                $clickAndCollectShipmentPrice = $this->pyzShipmentService->resolveClickAndCollectShipmentPrice($quoteTransfer);

                if ($clickAndCollectShipmentPrice !== null) {
                    $shipmentMethodTransfer->setStoreCurrencyPrice($clickAndCollectShipmentPrice);
                }
            }
        }

        return $shipmentMethodsCollectionTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer $shipmentMethodsCollectionTransfer
     * @param \ArrayObject $shipmentGroupCollection
     *
     * @return \ArrayObject
     */
    protected function expandShipmentGroupsWithTimeSlot(
        ShipmentMethodsCollectionTransfer $shipmentMethodsCollectionTransfer,
        ArrayObject $shipmentGroupCollection
    ): ArrayObject {
        $availableShipmentMethodsWithTimeSlots = new ShipmentMethodsTransfer();

        foreach ($shipmentMethodsCollectionTransfer->getShipmentMethods() as $availableShipmentMethodsTransfer) {
            foreach ($availableShipmentMethodsTransfer->getMethods() as $availableShipmentMethod) {
                $availableShipmentMethodsWithTimeSlots->addMethod(
                    $this->timeSlotClient->expandWithShipmentTimeSlots($availableShipmentMethod)
                );
            }
        }

        foreach ($shipmentGroupCollection as $shipmentGroupTransfer) {
            $shipmentGroupTransfer->setAvailableShipmentMethods($availableShipmentMethodsWithTimeSlots);
        }

        return $shipmentGroupCollection;
    }
}
