<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\LoginForm as SprykerLoginForm;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Blank;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 */
class LoginForm extends SprykerLoginForm
{
    public const FIELD_DATA = 'data';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->setAction('/login_check');

        $this
            ->addEmailField($builder)
            ->addPasswordField($builder)
            ->addDataField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addEmailField(FormBuilderInterface $builder)
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        $builder->add(self::FIELD_EMAIL, EmailType::class, [
            'label' => 'customer.login.email',
            'label_attr' => ($storeCodeBucket == 'CZ') ? ['class' => 'label-CZ'] : [],
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createEmailConstraint(),
            ],
            'mapped' => false,
            'attr' => [
                'placeholder' => 'customer.login.email_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addPasswordField(FormBuilderInterface $builder)
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        $builder->add(self::FIELD_PASSWORD, PasswordType::class, [
            'label' => 'customer.login.password',
            'label_attr' => ($storeCodeBucket == 'CZ') ? ['class' => 'label-CZ'] : [],
            'constraints' => $this->createNotBlankConstraint(),
            'mapped' => false,
            'attr' => [
                'autocomplete' => 'off',
                'placeholder' => 'customer.login.password_placeholder',
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addDataField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_DATA, HiddenType::class, [
            'constraints' => $this->createNotBlankConstraint(),
            'mapped' => false,
        ]);

        return $this;
    }

    /**
     * @return \Symfony\Component\Validator\Constraints\Blank
     */
    protected function createBlankConstraint(): Blank
    {
        return new Blank();
    }
}
