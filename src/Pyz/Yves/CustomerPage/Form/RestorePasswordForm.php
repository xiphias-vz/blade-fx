<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\RestorePasswordForm as SprykerRestorePasswordForm;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class RestorePasswordForm extends SprykerRestorePasswordForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addPasswordField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_PASSWORD, RepeatedType::class, [
            'first_name' => 'pass',
            'second_name' => 'confirm',
            'type' => PasswordType::class,
            'invalid_message' => PasswordForm::VALIDATOR_CONSTRAINTS_PASSWORD_DO_NOT_MATCH,
            'required' => true,
            'first_options' => [
                'label' => 'forms.password',
            ],
            'second_options' => [
                'label' => 'forms.confirm-password',
            ],
            'constraints' => [
                $this->createNotBlankConstraint(),
                new Length([
                    'min' => $this->getConfig()->getCustomerPasswordMinLength(),
                    'max' => $this->getConfig()->getCustomerPasswordMaxLength(),
                    'minMessage' => PasswordForm::VALIDATION_MIN_LENGTH_MESSAGE,
                    'maxMessage' => PasswordForm::VALIDATION_MAX_LENGTH_MESSAGE,
                ]),
                $this->getFactory()->createPasswordConstraint(),
            ],
        ]);

        return $this;
    }
}
