<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\AddressStep;
use Pyz\Yves\CheckoutPage\Process\Steps\CustomerStep;
use Pyz\Yves\CheckoutPage\Process\Steps\PaymentStep;
use Pyz\Yves\CheckoutPage\Process\Steps\PlaceOrderStep;
use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep\PostConditionChecker as ShipmentStepPostConditionChecker;
use Pyz\Yves\CheckoutPage\Process\Steps\SuccessStep;
use Pyz\Yves\CheckoutPage\Process\Steps\SummaryStep;
use Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep as SprykerAddressStep;
use SprykerShop\Yves\CheckoutPage\Process\Steps\PostConditionCheckerInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class StepFactory extends SprykerShopStepFactory
{
    /**
     * @return \Spryker\Yves\StepEngine\Process\StepCollectionInterface
     */
    public function createStepCollection()
    {
        $stepCollection = new StepCollection(
            $this->getUrlGenerator(),
            CheckoutPageControllerProvider::CHECKOUT_ERROR
        );

        $stepCollection
            ->addStep($this->createEntryStep())
            ->addStep($this->createCustomerStep())
            ->addStep($this->createAddressStep())
            ->addStep($this->createShipmentStep())
            ->addStep($this->createPaymentStep())
            ->addStep($this->createSummaryStep())
            ->addStep($this->createPlaceOrderStep())
            ->addStep($this->createSuccessStep());

        return $stepCollection;
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\AddressStep|\SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep
     */
    public function createAddressStep(): SprykerAddressStep
    {
        return new AddressStep(
            $this->getCalculationClient(),
            $this->createAddressStepExecutor(),
            $this->createAddressStepPostConditionChecker(),
            $this->getConfig(),
            CheckoutPageControllerProvider::CHECKOUT_ADDRESS,
            $this->getConfig()->getEscapeRoute(),
            $this->getCheckoutAddressStepEnterPreCheckPlugins()
        );
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\CustomerStep
     */
    public function createCustomerStep()
    {
        return new CustomerStep(
            $this->getCustomerClient(),
            $this->getCustomerStepHandler(),
            static::CHECKOUT_CUSTOMER,
            $this->getConfig()->getEscapeRoute(),
            $this->getApplication()->path(static::ROUTE_LOGOUT),
            $this->getCsrfTokenManager()
        );
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\PostConditionCheckerInterface
     */
    public function createShipmentStepPostConditionChecker(): PostConditionCheckerInterface
    {
        return new ShipmentStepPostConditionChecker(
            $this->getShipmentService(),
            $this->createGiftCardItemsChecker(),
            $this->getTimeSlotClient()
        );
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(ShopApplicationDependencyProvider::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\PaymentStep
     */
    public function createPaymentStep()
    {
        return new PaymentStep(
            $this->getPaymentClient(),
            $this->getPaymentMethodHandler(),
            CheckoutPageControllerProvider::CHECKOUT_PAYMENT,
            $this->getConfig()->getEscapeRoute(),
            $this->getFlashMessenger(),
            $this->getCalculationClient(),
            $this->getCheckoutPaymentStepEnterPreCheckPlugins()
        );
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\SummaryStep|\SprykerShop\Yves\CheckoutPage\Process\Steps\SummaryStep
     */
    public function createSummaryStep()
    {
        return new SummaryStep(
            $this->getProductBundleClient(),
            $this->getShipmentService(),
            $this->getConfig(),
            CheckoutPageControllerProvider::CHECKOUT_SUMMARY,
            $this->getConfig()->getEscapeRoute(),
            $this->getCheckoutClient(),
            $this->getOrderDetailClient()
        );
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\PlaceOrderStep|\SprykerShop\Yves\CheckoutPage\Process\Steps\PlaceOrderStep
     */
    public function createPlaceOrderStep()
    {
        return new PlaceOrderStep(
            $this->getCheckoutClient(),
            $this->getFlashMessenger(),
            $this->getStore()->getCurrentLocale(),
            $this->getGlossaryStorageClient(),
            CheckoutPageControllerProvider::CHECKOUT_PLACE_ORDER,
            $this->getConfig()->getEscapeRoute(),
            [
                static::ERROR_CODE_GENERAL_FAILURE => self::ROUTE_CART,
                'payment failed' => CheckoutPageControllerProvider::CHECKOUT_PAYMENT,
                'shipment failed' => CheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
            ]
        );
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\SuccessStep|\SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep
     */
    public function createSuccessStep()
    {
        return new SuccessStep(
            $this->getCustomerClient(),
            $this->getCartClient(),
            $this->getConfig(),
            CheckoutPageControllerProvider::CHECKOUT_SUCCESS,
            $this->getConfig()->getEscapeRoute()
        );
    }

    /**
     * @return \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    private function getOrderDetailClient(): OrderDetailClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_ORDER_DETAIL);
    }

    /**
     * @return \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    public function getTimeSlotClient(): TimeSlotClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_TIME_SLOT);
    }
}
