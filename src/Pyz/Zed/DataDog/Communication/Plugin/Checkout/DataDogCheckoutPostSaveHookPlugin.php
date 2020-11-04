<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataDog\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\DataDog\DataDogConfig;
use Pyz\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\DataDog\Communication\DataDogCommunicationFactory getFactory()
 */
class DataDogCheckoutPostSaveHookPlugin extends AbstractPlugin implements CheckoutPostSaveHookInterface
{
    /**
     * {@inheritDoc}
     * - Sends Business KPI to DataDog.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponse
     *
     * @return void
     */
    public function executeHook(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponse)
    {
        $paymentOption = [
            DataDogConfig::DATA_DOG_PAYMENT_OPTION_SCOPE => $quoteTransfer->getPayment()->getPaymentMethod(),
        ];

        if ($checkoutResponse->getIsSuccess()) {
            $this->getFactory()->getDataDogService()->increment([DataDogConfig::DATA_DOG_CHECKOUT_SUCCESS_STAT], $paymentOption);
            $this->getFactory()->getDataDogService()->increment([DataDogConfig::DATA_DOG_CHECKOUT_SUCCESS_REVENUE_STAT], $paymentOption, $quoteTransfer->getTotals()->getGrandTotal());

            $shipmentMethodKey = $quoteTransfer->getItems()[0]->getShipment()->getMethod()->getShipmentMethodKey();

            if ($shipmentMethodKey === ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT) {
                $this->getFactory()->getDataDogService()->increment([DataDogConfig::DATA_DOG_DELIVERY_PICK_UP_STAT], [DataDogConfig::DATA_DOG_MARKET_SCOPE => $quoteTransfer->getMerchantReference()]);

                return;
            }

            $this->getFactory()->getDataDogService()->increment([DataDogConfig::DATA_DOG_DELIVERY_STAT], [DataDogConfig::DATA_DOG_BUCKET_SCOPE => $quoteTransfer->getMerchantReference()]);

            return;
        }

        $this->getFactory()->getDataDogService()->increment([DataDogConfig::DATA_DOG_CHECKOUT_ERROR_STAT], $paymentOption);
    }
}
