<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Form;

use Pyz\Yves\CheckoutPage\Form\Steps\ShipmentCollectionForm;
use Pyz\Yves\CheckoutPage\Form\Steps\SummaryForm;
use Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use SprykerShop\Yves\CheckoutPage\Form\FormFactory as SprykerFormFactory;

class FormFactory extends SprykerFormFactory
{
    /**
     * @return string
     */
    public function getShipmentCollectionForm(): string
    {
        return ShipmentCollectionForm::class;
    }

    /**
     * @return string
     */
    public function getSummaryForm()
    {
        return SummaryForm::class;
    }

    /**
     * @return \Spryker\Yves\StepEngine\Form\FormCollectionHandlerInterface
     */
    public function createAddressFormCollection()
    {
        return $this->createFormCollection($this->getAddressFormTypes(), $this->getCheckoutAddressFormDataProviderPlugin());
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface
     */
    public function getCheckoutAddressFormDataProviderPlugin(): StepEngineFormDataProviderInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::PLUGIN_CHECKOUT_ADDRESS_FORM_DATA_PROVIDER);
    }
}
