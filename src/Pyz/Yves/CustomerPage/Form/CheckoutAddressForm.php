<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use Pyz\Yves\CustomerPage\Form\Constraints\PostalCodeConstraint;
use SprykerShop\Yves\CustomerPage\Form\CheckoutAddressForm as SprykerShopCheckoutAddressForm;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CheckoutAddressForm extends SprykerShopCheckoutAddressForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addAddressSelectField($builder, $options)
            ->addSalutationField($builder, $options)
            ->addFirstNameField($builder, $options)
            ->addLastNameField($builder, $options)
            ->addAddress1Field($builder, $options)
            ->addAddress2Field($builder, $options)
            ->addFloorLevelField($builder)
            ->addAdditionalInformationField($builder, $options)
            ->addZipCodeField($builder, $options)
            ->addCityField($builder, $options)
            ->addIso2CodeField($builder, $options)
            ->addPhoneNumberField($builder, $options)
            ->addIdCompanyUnitAddressTextField($builder)
            ->addIsAddressSavingSkippedField($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addFirstNameField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_FIRST_NAME, TextType::class, [
            'label' => 'customer.address.first_name',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.first_name_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                $this->createMinLengthConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addLastNameField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_LAST_NAME, TextType::class, [
            'label' => 'customer.address.last_name',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.last_name_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                $this->createMinLengthConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addAddress1Field(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ADDRESS_1, TextType::class, [
            'label' => 'customer.address.address1',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.address1_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                $this->createMinLengthConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addAddress2Field(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ADDRESS_2, TextType::class, [
            'label' => 'customer.address.number',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.address2_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                $this->createAddressNumberConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return SprykerShopCheckoutAddressForm
     */
    protected function addIsAddressSavingSkippedField(FormBuilderInterface $builder, array $options)
    {
        if (!$options[static::OPTION_IS_CUSTOMER_LOGGED_IN]) {
            return $this;
        }

        $builder->add(static::FIELD_IS_ADDRESS_SAVING_SKIPPED, CheckboxType::class, [
            'label' => static::GLOSSARY_KEY_SAVE_NEW_ADDRESS,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addZipCodeField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ZIP_CODE, TextType::class, [
            'label' => 'customer.address.zip_code',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.zip_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addPhoneNumberField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_PHONE, TelType::class, [
            'label' => 'customer.address.phone',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.phone_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addCityField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_CITY, TextType::class, [
            'label' => 'customer.address.city',
            'required' => true,
            'trim' => true,
            'attr' => [
                'placeholder' => 'customer.registration.city_placeholder',
            ],
            'constraints' => [
                $this->createNotBlankConstraint($options),
                $this->createMinLengthConstraint($options),
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addIso2CodeField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ISO_2_CODE, HiddenType::class, [
            'label' => 'customer.address.country',
            'data' => array_keys($options[self::OPTION_COUNTRY_CHOICES])[0],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addFloorLevelField(FormBuilderInterface $builder)
    {
        $builder->add(RegisterForm::FIELD_FLOOR_LEVEL, ChoiceType::class, [
            'choices' => array_flip(RegisterForm::FLOORS),
            'label' => 'customer.address.floor',
            'required' => false,
            'trim' => true,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addAdditionalInformationField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(RegisterForm::FIELD_ADDITIONAL_INFORMATION, TextType::class, [
            'label' => 'customer.address.additional_info',
            'required' => false,
            'trim' => true,
            'constraints' => [
                ProfileForm::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    public function addSalutationField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_SALUTATION, ChoiceType::class, [
            'choices' => array_flip([
                'Mr' => 'customer.salutation.mr',
                'Ms' => 'customer.salutation.ms',
                'Divers' => 'customer.salutation.divers',
                'Dr' => 'customer.salutation.dr',
            ]),
            'label' => 'profile.form.salutation',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint($options),
            ],
        ]);

        return $this;
    }
}
