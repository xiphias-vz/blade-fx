<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CustomerPage\Form\CheckoutAddressCollectionForm as SprykerShopCheckoutAddressCollectionForm;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;

class CheckoutAddressCollectionForm extends SprykerShopCheckoutAddressCollectionForm
{
    public const OPTION_CART_NOTE = 'cart_note';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addShippingAddressSubForm($builder, $options)
            ->addItemShippingAddressSubForm($builder, $options)
            ->addTextAreaMessage($builder)
            ->addSameAsShippingCheckboxField($builder)
            ->addBillingAddressSubForm($builder, $options)
            ->addIsMultipleShipmentEnabledField($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addTextAreaMessage(FormBuilderInterface $builder)
    {
        $builder->add(self::OPTION_CART_NOTE, TextareaType::class, [
            'label' => ' ',
            'required' => false,
            'trim' => false,
            'attr' => [
                'placeholder' => 'cart.checkout.address.abholstation.textarea.note',
                'class' => 'txtarea--checkout',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\CheckoutAddressCollectionForm
     */
    protected function addShippingAddressSubForm(FormBuilderInterface $builder, array $options)
    {
        $shipmentService = $this->getFactory()->getShipmentService();

        $fieldOptions = [
            'data_class' => AddressTransfer::class,
            'required' => true,
            'mapped' => false,
            'validation_groups' => function (FormInterface $form) {
                if ($this->isIdCustomerAddressFieldNotEmpty($form)
                    || $this->isIdCompanyUnitAddressFieldNotEmpty($form)
                ) {
                    return false;
                }

                return [static::GROUP_SHIPPING_ADDRESS];
            },
            CheckoutAddressForm::OPTION_VALIDATION_GROUP => static::GROUP_SHIPPING_ADDRESS,
            CheckoutAddressForm::OPTION_ADDRESS_CHOICES => $options[static::OPTION_SINGLE_SHIPPING_ADDRESS_CHOICES],
            CheckoutAddressForm::OPTION_COUNTRY_CHOICES => $options[static::OPTION_COUNTRY_CHOICES],
            CheckoutAddressForm::OPTION_IS_CUSTOMER_LOGGED_IN => $options[static::OPTION_IS_CUSTOMER_LOGGED_IN],
        ];

        $builder->add(static::FIELD_SHIPPING_ADDRESS, CheckoutAddressForm::class, $fieldOptions);

        $builder->addEventListener(FormEvents::POST_SET_DATA, function (FormEvent $event) use ($shipmentService) {
            $this->hydrateShippingAddressSubFormDataFromItemLevelShippingAddresses($event, $shipmentService);
        });

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) use ($options) {
            return $this->mapSubmittedShippingAddressSubFormDataToItemLevelShippingAddresses($event, $options);
        });

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\CheckoutAddressCollectionForm
     */
    protected function addBillingAddressSubForm(FormBuilderInterface $builder, array $options)
    {
        $options = [
            'data_class' => AddressTransfer::class,
            'required' => true,
            'mapped' => false,
            'validation_groups' => function (FormInterface $form) {
                if ($form->getParent()->get(static::FIELD_BILLING_SAME_AS_SHIPPING)->getData()) {
                    return false;
                }

                if ($this->isIdCustomerAddressExistAndNotEmpty($form)
                    || $this->isIdCompanyUnitAddressFieldExistAndNotEmpty($form)
                ) {
                    return false;
                }

                return [static::GROUP_BILLING_ADDRESS];
            },
            CheckoutAddressForm::OPTION_VALIDATION_GROUP => static::GROUP_BILLING_ADDRESS,
            CheckoutAddressForm::OPTION_ADDRESS_CHOICES => $options[static::OPTION_BILLING_ADDRESS_CHOICES],
            CheckoutAddressForm::OPTION_COUNTRY_CHOICES => $options[static::OPTION_COUNTRY_CHOICES],
            CheckoutAddressForm::OPTION_IS_CUSTOMER_LOGGED_IN => $options[static::OPTION_IS_CUSTOMER_LOGGED_IN],
        ];

        $builder->add(static::FIELD_BILLING_ADDRESS, CheckoutAddressForm::class, $options);

        $builder->addEventListener(FormEvents::POST_SET_DATA, function (FormEvent $event) {
            $this->mapQuoteBillingAddressToBillingAddressSubFormData($event);
        });

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
            return $this->mapBillingAddressSubFormDataToQuoteBillingAddress($event);
        });

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addItemShippingAddressSubForm(FormBuilderInterface $builder, array $options)
    {
        if (!$options[static::OPTION_CAN_DELIVER_TO_MULTIPLE_SHIPPING_ADDRESSES]) {
            return $this;
        }

        $fieldOptions = [
            'label' => false,
            'property_path' => static::PROPERTY_PATH_MULTI_SHIPPING_ADDRESSES,
            'entry_type' => CheckoutMultiShippingAddressesForm::class,
            'entry_options' => [
                'data_class' => ItemTransfer::class,
                'label' => false,
                CheckoutMultiShippingAddressesForm::OPTION_VALIDATION_GROUP => static::GROUP_SHIPPING_ADDRESS,
                CheckoutMultiShippingAddressesForm::OPTION_ADDRESS_CHOICES => $options[static::OPTION_MULTIPLE_SHIPPING_ADDRESS_CHOICES],
                CheckoutMultiShippingAddressesForm::OPTION_COUNTRY_CHOICES => $options[static::OPTION_COUNTRY_CHOICES],
                CheckoutMultiShippingAddressesForm::OPTION_IS_CUSTOMER_LOGGED_IN => $options[static::OPTION_IS_CUSTOMER_LOGGED_IN],
            ],
        ];

        $builder->add(static::FIELD_MULTI_SHIPPING_ADDRESSES, CollectionType::class, $fieldOptions);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $form
     *
     * @return bool
     */
    protected function isIdCustomerAddressFieldNotEmpty(FormInterface $form): bool
    {
        return !$form->has(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)
            || ($form->get(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)->getData() !== CheckoutAddressForm::VALUE_ADD_NEW_ADDRESS
                && $form->get(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)->getData() !== null);
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $form
     *
     * @return bool
     */
    protected function isIdCustomerAddressExistAndNotEmpty(FormInterface $form): bool
    {
        return $form->has(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)
            && ($form->get(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)->getData() !== CheckoutAddressForm::VALUE_ADD_NEW_ADDRESS
                && $form->get(CheckoutAddressForm::FIELD_ID_CUSTOMER_ADDRESS)->getData() !== null);
    }

    /**
     * @param \Symfony\Component\Form\FormEvent $event
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormEvent
     */
    protected function mapSubmittedShippingAddressSubFormDataToItemLevelShippingAddresses(
        FormEvent $event,
        array $options
    ): FormEvent {
        if (!$event->getForm()->isValid()) {
            return $event;
        }

        return parent::mapSubmittedShippingAddressSubFormDataToItemLevelShippingAddresses($event, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormEvent $event
     *
     * @return \Symfony\Component\Form\FormEvent
     */
    protected function mapBillingAddressSubFormDataToQuoteBillingAddress(
        FormEvent $event
    ): FormEvent {
        $form = $event->getForm();
        if (!$form->isValid()) {
            return $event;
        }

        $quoteTransfer = $event->getData();
        if (!($quoteTransfer instanceof QuoteTransfer)) {
            return $event;
        }

        $billingAddressForm = $form->get(static::FIELD_BILLING_ADDRESS);
        $quoteTransfer->setBillingAddress($billingAddressForm->getData());
        $event->setData($quoteTransfer);

        return $event;
    }

    /**
     * @param \Symfony\Component\Form\FormEvent $event
     *
     * @return void
     */
    protected function mapQuoteBillingAddressToBillingAddressSubFormData(FormEvent $event): void
    {
        $quoteTransfer = $event->getData();
        if (!($quoteTransfer instanceof QuoteTransfer)) {
            return;
        }

        $billingAddressForm = $event->getForm()->get(static::FIELD_BILLING_ADDRESS);
        $billingAddressForm->setData(clone $quoteTransfer->getBillingAddress());
    }
}
