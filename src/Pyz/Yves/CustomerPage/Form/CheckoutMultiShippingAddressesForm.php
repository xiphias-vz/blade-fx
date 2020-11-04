<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use Generated\Shared\Transfer\AddressTransfer;
use SprykerShop\Yves\CustomerPage\Form\CheckoutMultiShippingAddressesForm as SprykerShopCheckoutMultiShippingAddressesForm;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormInterface;

class CheckoutMultiShippingAddressesForm extends SprykerShopCheckoutMultiShippingAddressesForm
{
    /**
     * @param \Symfony\Component\Form\FormEvent $event
     * @param array $options
     *
     * @return void
     */
    protected function addShippingAddressFieldForRegularItem(FormEvent $event, array $options): void
    {
        /** @var \Generated\Shared\Transfer\ItemTransfer $itemTransfer */
        $itemTransfer = $event->getData();
        $form = $event->getForm();

        if ($itemTransfer->getRelatedBundleItemIdentifier()) {
            return;
        }

        $form->add(static::FIELD_SHIPPING_ADDRESS, CheckoutAddressForm::class, [
            'property_path' => static::PROPERTY_PATH_SHIPPING_ADDRESS,
            'data_class' => AddressTransfer::class,
            'required' => true,
            'validation_groups' => function (FormInterface $form) {
                $customerAddressForm = $form->getParent()
                    ->getParent()
                    ->getParent()
                    ->get(CheckoutAddressCollectionForm::FIELD_SHIPPING_ADDRESS);

                if (!$this->isDeliverToMultipleAddressesEnabled($customerAddressForm)) {
                    return false;
                }

                if ($this->isNewAddressFormShouldNotBeValidated($customerAddressForm)) {
                    return false;
                }

                if ($this->isNewAddressFormShouldNotBeValidated($form)) {
                    return false;
                }

                return [CheckoutAddressCollectionForm::GROUP_SHIPPING_ADDRESS];
            },
            CheckoutAddressForm::OPTION_VALIDATION_GROUP => $options[static::OPTION_VALIDATION_GROUP],
            CheckoutAddressForm::OPTION_ADDRESS_CHOICES => $options[static::OPTION_ADDRESS_CHOICES],
            CheckoutAddressForm::OPTION_COUNTRY_CHOICES => $options[static::OPTION_COUNTRY_CHOICES],
            CheckoutAddressForm::OPTION_IS_CUSTOMER_LOGGED_IN => $options[static::OPTION_IS_CUSTOMER_LOGGED_IN],
        ]);
    }
}
