<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Service\User\UserServiceInterface;
use Pyz\Yves\CheckoutPage\Form\DataProvider\ShipmentFormDataProvider;
use Pyz\Yves\CheckoutPage\Form\FormFactory;
use Pyz\Yves\CheckoutPage\Process\StepFactory;
use Pyz\Yves\CustomerPage\CustomerPageDependencyProvider;
use Pyz\Yves\CustomerPage\Form\Constraints\PasswordConstraint;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;

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
            $this->getTimeSlotClient()
        );
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Process\StepFactory
     */
    public function createStepFactory()
    {
        return new StepFactory();
    }

    /**
     * @return \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    public function getTimeSlotClient(): TimeSlotClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_TIME_SLOT);
    }

    /**
     * @return \Pyz\Yves\CheckoutPage\Form\FormFactory|\SprykerShop\Yves\CheckoutPage\Form\FormFactory
     */
    public function createCheckoutFormFactory()
    {
        return new FormFactory();
    }

    /**
     * @return \Pyz\Yves\CustomerPage\Form\Constraints\PasswordConstraint
     */
    public function createPasswordConstraint(): PasswordConstraint
    {
        return new PasswordConstraint([PasswordConstraint::OPTION_USER_SERVICE => $this->getUserService()]);
    }

    /**
     * @return \Pyz\Service\User\UserServiceInterface
     */
    public function getUserService(): UserServiceInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::SERVICE_USER);
    }

    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getBaseCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_BASE_CUSTOMER);
    }
}
