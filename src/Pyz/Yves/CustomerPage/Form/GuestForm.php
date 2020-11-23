<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use Pyz\Yves\CustomerPage\Form\Constraints\PostalCodeConstraint;
use SprykerShop\Yves\CustomerPage\Form\GuestForm as SprykerGuestForm;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class GuestForm extends SprykerGuestForm
{
    public const FIELD_ADDRESS_1 = 'address1';
    public const FIELD_ADDRESS_2 = 'address2';
    public const FIELD_ZIP_CODE = 'zip_code';
    public const FIELD_CITY = 'city';
    public const FIELD_PHONE = 'phone';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addSalutationField($builder)
            ->addFirstNameField($builder)
            ->addLastNameField($builder)
            ->addEmailField($builder)
            ->addAddress1Field($builder)
            ->addAddress2Field($builder)
            ->addZipCodeField($builder)
            ->addCityField($builder)
            ->addPhoneField($builder)
            ->addIsGuestField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addFirstNameField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_FIRST_NAME, TextType::class, [
            'label' => 'customer.first_name',
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
            'attr' =>
            [
                'placeholder' => 'customer.first_name',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addLastNameField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_LAST_NAME, TextType::class, [
            'label' => 'customer.last_name',
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
            'attr' =>
            [
                'placeholder' => 'customer.last_name',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addEmailField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_EMAIL, EmailType::class, [
            'label' => 'auth.email',
            'attr' =>
            [
                'placeholder' => 'customer.profile.email',
            ],
            'constraints' => [
                $this->createNotBlankConstraint(),
                new Callback([
                    'callback' => function ($email, ExecutionContextInterface $context) {
                        $isEmailFormatValid = $this->getFactory()
                            ->getUtilValidateService()
                            ->isEmailFormatValid($email);

                        if (!$isEmailFormatValid) {
                            $context->buildViolation('customer.email.format.invalid')->addViolation();
                        }
                    },
                ]),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addAddress1Field(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ADDRESS_1, TextType::class, [
            'label' => 'customer.address.address1',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.address1_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addAddress2Field(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ADDRESS_2, TextType::class, [
            'label' => 'customer.address.number',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.address2_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addZipCodeField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ZIP_CODE, TextType::class, [
            'label' => 'customer.address.zip_code',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                new PostalCodeConstraint([
                    'customerBaseClient' => $this->getFactory()->createCustomerFormFactory()->getCustomerClient(),
                ])           ],
            'attr' => [
                'placeholder' => 'customer.registration.zip_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addCityField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_CITY, TextType::class, [
            'label' => 'customer.address.city',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.city_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\GuestForm
     */
    protected function addPhoneField(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_PHONE, TextType::class, [
            'label' => 'customer.phone.checkout.guest',
            'required' => false,
            'trim' => true,
            'constraints' => [
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.phone.checkout.guest',
            ],
        ]);

        return $this;
    }
}
