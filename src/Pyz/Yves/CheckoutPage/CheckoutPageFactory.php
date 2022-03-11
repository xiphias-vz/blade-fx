<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotService;
use Pyz\Yves\CheckoutPage\Form\DataProvider\ShipmentFormDataProvider;
use Pyz\Yves\CheckoutPage\Form\FormFactory;
use Pyz\Yves\CheckoutPage\Process\StepFactory;
use Pyz\Yves\CustomerPage\CustomerPageDependencyProvider;
use Spryker\Client\Customer\CustomerClientInterface;
use Spryker\Client\Session\SessionClientInterface;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;
use voku\helper\AntiXSS;

class CheckoutPageFactory extends SprykerShopCheckoutPageFactory
{
    /**
     * @return \Pyz\Yves\CheckoutPage\Form\DataProvider\ShipmentFormDataProvider
     */
    public function createShipmentDataProvider()
    {
        return new ShipmentFormDataProvider(
            $this->getShipmentClient(),
            $this->getGlossaryStorageClient(),
            $this->getStore(),
            $this->getMoneyPlugin(),
            $this->getShipmentService(),
            $this->getConfig(),
            $this->getProductBundleClient(),
            $this->getTimeSlotClient(),
            $this->getPyzShipmentService()
        );
    }

    /**
     * @return \Spryker\Client\Session\SessionClientInterface
     */
    public function getSessionClient(): SessionClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_SESSION);
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\StepFactory
     */
    public function createStepFactory()
    {
        return new StepFactory();
    }

    /**
     * @return \Spryker\Client\Customer\CustomerClientInterface
     */
    public function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CUSTOMER_CLIENT);
    }

    /**
     * @return \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    public function getTimeSlotClient(): TimeSlotClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_TIME_SLOT);
    }

    /**
     * @return \Pyz\Service\TimeSlot\TimeSlotService
     */
    public function getTimeSlotService(): TimeSlotService
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::SERVICE_TIME_SLOT);
    }

    /**
     * @return \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    public function getPyzShipmentService(): ShipmentServiceInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::PYZ_SERVICE_SHIPMENT);
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Form\FormFactory|\SprykerShop\Yves\CheckoutPage\Form\FormFactory
     */
    public function createCheckoutFormFactory()
    {
        return new FormFactory();
    }

    /**
     * @return \SprykerShop\Yves\CustomerPage\Plugin\AuthenticationHandler
     */
    public function getAuthenticationHandler()
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::PLUGIN_AUTHENTICATION_HANDLER);
    }

    /**
     * @return \Pyz\Client\Merchant\MerchantClientInterface
     */
    public function getMerchantClient()
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::MERCHANT_CLIENT);
    }

    /**
     * @return \voku\helper\AntiXSS
     */
    public function getAntiXss(): AntiXSS
    {
        return new AntiXSS();
    }
}
