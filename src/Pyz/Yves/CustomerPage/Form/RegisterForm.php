<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use Mpdf\Form;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Form\Constraints\PostalCodeConstraint;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\Form\RegisterForm as SprykerRegisterForm;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\Blank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class RegisterForm extends SprykerRegisterForm
{
    public const FIELD_ADDRESS_1 = 'address1';
    public const FIELD_ADDRESS_2 = 'address2';
    public const FIELD_FLOOR_LEVEL = 'floor';
    public const FIELD_ZIP_CODE = 'zip_code';
    public const FIELD_CITY = 'city';
    public const FIELD_ADDITIONAL_INFORMATION = 'additional_info';
    public const FIELD_PHONE = 'phone';
    public const FIELD_MERCHANT = 'merchant_reference';
    public const FIELD_ADDITIONAL_REGISTER = 'third_party_registration';
    public const FORM_NAME = self::BLOCK_PREFIX;
    public const FIELD_COUNTRY = 'country';
    public const FIELD_PHONE_PREFIX_1 = 'phone_prefix';
    public const FIELD_PHONE_PREFIX_2 = 'mobile_phone_prefix';
    public const FIELD_MOBILE_PHONE = 'mobile_phone_number';
    public const FIELD_RECIEVE_NOTIFICATIONS = 'accept_notifications';
    public const FIELD_DAY = 'birth_day';
    public const FIELD_MONTH = 'birth_month';
    public const FIELD_YEAR = 'birth_year';

    protected const VALIDATION_ADDRESS_NUMBER_MESSAGE = 'validation.address_number';
    protected const VALIDATION_NOT_BLANK_MESSAGE = 'validation.not_blank';
    protected const VALIDATION_MIN_LENGTH_MESSAGE = 'validation.min_length';
    public const FLOORS = [
        null => 'customer.registration.floor_placeholder',
        'customer.address.floor.ug' => 'customer.address.floor.ug',
        'customer.address.floor.eg' => 'customer.address.floor.eg',
        'customer.address.floor.1' => 'customer.address.floor.1',
        'customer.address.floor.2' => 'customer.address.floor.2',
        'customer.address.floor.3' => 'customer.address.floor.3',
        'customer.address.floor.4' => 'customer.address.floor.4',
        'customer.address.floor.5' => 'customer.address.floor.5',
        'customer.address.floor.6' => 'customer.address.floor.6',
        'customer.address.floor.7' => 'customer.address.floor.7',
        'customer.address.floor.8' => 'customer.address.floor.8',
    ];


    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addEmailField($builder)
            ->addPasswordField($builder, $options);

        $this
            ->addSalutationField($builder)
            ->addFirstNameField($builder)
            ->addLastNameField($builder);

        $this
            ->addAddress1Field($builder, $options)
            ->addAddress2Field($builder, $options)
            ->addZipCodeField($builder, $options)
            ->addCityField($builder, $options)
            ->addCountryField($builder)
            ->addMobilePrefixField1($builder)
            ->addMobileNumber($builder)
            ->addMobilePrefixField2($builder)
            ->addPhoneField($builder)
//            ->addBirthdateGroup($builder)
            ->addDayField($builder)
            ->addAcceptTermsField($builder)
            ->addFieldRecieveNotificationsAboutProducts($builder)
            ->addAdditionalRegisterField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addGroup(FormBuilderInterface $builder)
    {
        $builder->add(
            $builder->create('group1', FormType::class, array('inherit_data' => true))
                ->add('email', EmailType::class, array())
                ->add('field1', TextType::class, array())
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addFirstNameField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_FIRST_NAME, TextType::class, [
            'label' => 'customer.first_name',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint(),
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.first_name_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\RegisterForm
     */
    protected function addLastNameField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_LAST_NAME, TextType::class, [
            'label' => 'customer.last_name',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint(),
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.last_name_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addEmailField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_EMAIL, EmailType::class, [
            'label' => 'auth.email',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.email_placeholder',
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
    protected function addPasswordField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_PASSWORD, RepeatedType::class, [
            'first_name' => 'pass',
            'second_name' => 'confirm',
            'type' => PasswordType::class,
            'invalid_message' => 'validator.constraints.password.do_not_match',
            'required' => true,
            'first_options' => [
                'label' => 'forms.password',
                'attr' => [
                    'autocomplete' => 'off',
                    'placeholder' => 'customer.registration.password_placeholder',
                ],
            ],
            'second_options' => [
                'label' => 'forms.confirm-password',
                'attr' => [
                    'autocomplete' => 'off',
                    'placeholder' => 'customer.registration.confirm_password_placeholder',
                ],
            ],
            'constraints' => [
                new Length([
                    'min' => $this->getConfig()->getCustomerPasswordMinLength(),
                    'max' => $this->getConfig()->getCustomerPasswordMaxLength(),
                    'minMessage' => static::VALIDATION_MIN_LENGTH_MESSAGE,
                    'maxMessage' => static::VALIDATION_MAX_LENGTH_MESSAGE,
                ]),
                $this->createNotBlankConstraint(),
                $this->getFactory()->createPasswordConstraint(),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\RegisterForm
     */
    protected function addAcceptTermsField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ACCEPT_TERMS, CheckboxType::class, [
            'label' => 'register.accept_terms',
            'mapped' => true,
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
        ]);

        return $this;
    }

    /**
     * @param FormBuilderInterface $builder
     * @return $this
     */
    protected function addAdditionalRegisterField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ADDITIONAL_REGISTER, CheckboxType::class, [
            'label' => 'forms.additional_register',
            'mapped' => true,
            'required' => false,
        ]);

        return $this;
    }


    /**
     * @param FormBuilderInterface $builder
     * @return $this
     */
    protected function addFieldRecieveNotificationsAboutProducts(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_RECIEVE_NOTIFICATIONS, CheckboxType::class,[
           'label' => 'forms.recieve_notifications',
           'mapped' => true,
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
    protected function addAddress1Field(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ADDRESS_1, TextType::class, [
            'label' => 'customer.address.address1',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint($options),
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
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createAddressNumberConstraint($options),
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
     * @return $this
     */
    protected function addFloorLevelField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_FLOOR_LEVEL, ChoiceType::class, [
            'choices' => array_flip(self::FLOORS),
            'label' => 'customer.address.floor',
            'required' => false,
            'trim' => true,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\RegisterForm
     */
    protected function addSalutationField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_SALUTATION, ChoiceType::class, [
            'choices' => array_flip([
                'Mr' => 'customer.salutation.mr',
                'Ms' => 'customer.salutation.ms',
                'Divers' => 'customer.salutation.divers',
                'Dr' => 'customer.salutation.dr',
            ]),
            'required' => true,
            'label' => 'address.salutation',
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addMerchantField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_MERCHANT, ChoiceType::class, [
            'choices' => $this->getMerchantChoices(),
            'required' => true,
            'label' => 'customer.address.merchant',
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
        ]);

        return $this;
    }

    protected function addCountryField(FormBuilderInterface $builder)
    {
        $countries = Config::get(CustomerConstants::CUSTOMER_COUNTRY);
        $builder->add(self::FIELD_COUNTRY, ChoiceType::class, [
            'choices' => array_flip($countries),
            'required' => true,
            'label' => 'customer.address.country',
            'constraints' =>
            [
                $this->createNotBlankConstraint(),
            ],
        ]);
        return $this;
    }

    protected function addMobilePrefixField1(FormBuilderInterface $builder)
    {
        $prefixes = Config::get(CustomerConstants::CUSTOMER_PHONE_PREFIX);
        $builder->add(self::FIELD_PHONE_PREFIX_1, ChoiceType::class,[
            'choices' => array_flip($prefixes),
            'required' => true,
            'label' => false,
            'constraints' =>
            [
                $this->createNotBlankConstraint(),
            ]
        ]);
        return $this;
    }

    protected function addMobilePrefixField2(FormBuilderInterface $builder)
    {
        $prefixes = Config::get(CustomerConstants::CUSTOMER_PHONE_PREFIX);
        $builder->add(self::FIELD_PHONE_PREFIX_2, ChoiceType::class,[
            'choices' => array_flip($prefixes),
            'required' => false,
            'label' => false,
            'constraints' =>
                [
                    $this->createNotBlankConstraint(),
                ]
        ]);
        return $this;
    }

    protected function addMobileNumber(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_MOBILE_PHONE, TextType::class,[
            'required' => true,
            'trim' => true,
            'label' => false,
            'constraints' =>
            [
                $this->createNotBlankConstraint(),
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr'=>
                [
                    'placeholder'=> 'mobile.phone.number'
                ],
        ]);
        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addAdditionalInformationField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ADDITIONAL_INFORMATION, TextType::class, [
            'label' => 'customer.address.additional_info',
            'required' => false,
            'trim' => true,
            'constraints' => [
                ProfileForm::createSafeStringRegexConstraint(),
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
    protected function addZipCodeField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_ZIP_CODE, TextType::class, [
            'label' => 'customer.address.zip_code',
            'required' => true,
            'trim' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
            'attr' => [
                'placeholder' => 'customer.registration.zip_placeholder',
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
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint($options),
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
     * @return $this
     */
    protected function addPhoneField(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_PHONE, TextType::class, [
            'label' => false,
            'required' => false,
            'trim' => true,
            'attr' => [
            ],
            'constraints' => [
                ProfileForm::createSafeStringRegexConstraint(),
            ],
            'attr'=>
            [
                'placeholder'=> 'customer.land.phone'
            ],
        ]);

        return $this;
    }

//    protected function addBirthdateGroup(FormBuilderInterface $builder)
//    {
//        $days = [];
//        $months = [];
//        $years = [];
//
//        for($i = 1; $i<32; $i++)
//        {
//            $days[$i] = $i;
//            if($i < 13){
//                $months[$i] = $i;
//            }
//        }
//
//        $currentYear= date("Y");
//        for($i = 1900; $i<=intval($currentYear); $i++)
//        {
//            $years[$i] = $i;
//        }
//
//        $builder->add(
//            $builder->create('datesGroup', FormType::class, array('inherit_data' => true, 'label' => 'customer.register.birthdate'))
//                ->add(static::FIELD_DAY, ChoiceType::class, array(
//                    'choices' => array_flip($days),
//                    'required' => true,
//                    'trim' => true,
//                    'label' => false,
//                    'attr' => array(
//                        'class' => 'col col--sm-12 col--lg-4',
//                        'placeholder' => 'customer.date.day'
//                    ),
//                    'constraints' =>
//                        array(
//                            $this->createNotBlankConstraint(),
//                        )
//                ))
//                ->add(static::FIELD_MONTH, ChoiceType::class,[
//                    'choices' => array_flip($months),
//                    'required' => true,
//                    'trim' => true,
//                    'label' => false,
//                    'attr' => [
//                        'class' => 'col col--sm-12 col--lg-4',
//                        'placeholder' => 'customer.date.month'
//                    ],
//                    'constraints' =>
//                        [
//                            $this->createNotBlankConstraint(),
//                        ]
//                ])
//                ->add(static::FIELD_YEAR, ChoiceType::class,[
//                    'choices' => array_flip($years),
//                    'required' => true,
//                    'trim' => true,
//                    'label' => false,
//                    'attr' => [
//                        'class' => 'col col--sm-12 col--lg-4',
//                        'placeholder' => 'customer.date.year'
//                    ],
//                    'constraints' =>
//                        [
//                            $this->createNotBlankConstraint()
//                        ]
//                ])
//        );
//        return $this;
//    }

    protected function addDayField(FormBuilderInterface $builder)
    {
        $days = [];
        for($i = 1; $i<32; $i++)
        {
            $days[$i] = $i;
        }
        $builder->add(static::FIELD_DAY, ChoiceType::class,[
            'choices' => array_flip($days),
            'required' => true,
            'trim' => true,
            'label' => false,
            'attr' => [
                'placeholder' => 'customer.date.day'
            ],
            'constraints' =>
            [
                $this->createNotBlankConstraint(),
            ],
        ]);
        return $this;
    }

    protected function addMonthField(FormBuilderInterface $builder)
    {
        $months = [];
        for($i = 1; $i<13; $i++)
        {
            $months[$i] = $i;
        }
        $builder->add(static::FIELD_MONTH, ChoiceType::class,[
            'choices' => array_flip($months),
            'required' => true,
            'trim' => true,
            'label' => false,
            'attr' => [
                'placeholder' => 'customer.date.month'
            ],
            'constraints' =>
                [
                    $this->createNotBlankConstraint(),
                ],
        ]);
        return $this;
    }
    protected function AddYearField(FormBuilderInterface $builder)
    {
        $years = [];
        $currentYear= date("Y");
        for($i = 1900; $i<intval($currentYear); $i++)
        {
            $years[$i] = $i;
        }
        $builder->add(static::FIELD_YEAR, ChoiceType::class,[
            'choices' => array_flip($years),
            'required' => true,
            'trim' => true,
            'label' => false,
            'attr' => [
                'placeholder' => 'customer.date.year'
            ],
            'constraints' =>
            [
                $this->createNotBlankConstraint(),
            ],
        ]);
        return $this;
    }

    /**
     * @param array $options
     *
     * @return \Symfony\Component\Validator\Constraints\Length
     */
    protected function createMinLengthConstraint(array $options = [])
    {
        $validationGroup = $this->getValidationGroup($options);

        return new Length([
            'min' => 3,
            'groups' => $validationGroup,
            'minMessage' => static::VALIDATION_MIN_LENGTH_MESSAGE,
        ]);
    }

    /**
     * @param array $options
     *
     * @return \Symfony\Component\Validator\Constraints\Regex
     */
    protected function createAddressNumberConstraint(array $options)
    {
        $validationGroup = $this->getValidationGroup($options);

        return new Regex([
            'pattern' => '/^\d+[a-zA-Z]*$/',
            'message' => static::VALIDATION_ADDRESS_NUMBER_MESSAGE,
            'groups' => $validationGroup,
        ]);
    }

    /**
     * @return \Symfony\Component\Validator\Constraints\NotBlank
     */
    protected function createNotBlankConstraint(): NotBlank
    {
        return new NotBlank(['message' => static::VALIDATION_NOT_BLANK_MESSAGE]);
    }

    /**
     * @param array $options
     *
     * @return string
     */
    protected function getValidationGroup(array $options)
    {
        $validationGroup = Constraint::DEFAULT_GROUP;
        if (!empty($options['validation_group'])) {
            $validationGroup = $options['validation_group'];
        }

        return $validationGroup;
    }


    /**
     * @return string[]
     */
    private function getMerchantChoices(): array
    {
        $merchantClient = $this->getFactory()->getMerchantSearchClient();
        $activeMerchants = $merchantClient->getActiveMerchants()->getMerchants();
        $choices = [];
        foreach ($activeMerchants as $merchantTransfer) {
            $choices[$merchantTransfer->getName()] = $merchantTransfer->getMerchantReference();
        }

        return $choices;
    }
}
