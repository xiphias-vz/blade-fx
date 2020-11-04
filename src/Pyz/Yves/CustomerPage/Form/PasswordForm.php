<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\PasswordForm as SprykerPasswordForm;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 */
class PasswordForm extends SprykerPasswordForm
{
    public const VALIDATION_MIN_LENGTH_MESSAGE = 'validation.min_length';
    public const VALIDATION_MAX_LENGTH_MESSAGE = 'validation.max_length.singular';
    public const VALIDATOR_CONSTRAINTS_PASSWORD_DO_NOT_MATCH = 'validator.constraints.password.do_not_match';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addNewPasswordField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_NEW_PASSWORD, RepeatedType::class, [
            'first_name' => self::FIELD_PASSWORD,
            'second_name' => 'confirm',
            'type' => PasswordType::class,
            'invalid_message' => self::VALIDATOR_CONSTRAINTS_PASSWORD_DO_NOT_MATCH,
            'required' => true,
            'first_options' => [
                'label' => 'customer.password.request.new_password',
                'attr' => ['autocomplete' => 'off'],
            ],
            'second_options' => [
                'label' => 'customer.password.confirm.new_password',
                'attr' => ['autocomplete' => 'off'],
            ],
            'constraints' => [
                new NotBlank(),
                new Length([
                    'min' => $this->getConfig()->getCustomerPasswordMinLength(),
                    'max' => $this->getConfig()->getCustomerPasswordMaxLength(),
                    'minMessage' => static::VALIDATION_MIN_LENGTH_MESSAGE,
                    'maxMessage' => static::VALIDATION_MAX_LENGTH_MESSAGE,
                ]),
                $this->getFactory()->createPasswordConstraint(),
            ],
        ]);

        return $this;
    }
}
