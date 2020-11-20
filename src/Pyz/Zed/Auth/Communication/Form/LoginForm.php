<?php

namespace Pyz\Zed\Auth\Communication\Form;

use Spryker\Zed\Auth\Communication\Form\LoginForm as SprykerLoginForm;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Required;

class LoginForm extends SprykerLoginForm
{
    public const FIELD_CHECKBOX = 'checkbox';

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addUserNameField($builder)
            ->addPasswordField($builder)
            ->addCheckboxField($builder);
    }

    /**
     * @param FormBuilderInterface $builder
     * @return $this|LoginForm
     */
    protected function addUserNameField(FormBuilderInterface $builder)
    {
        $builder
            ->add(self::FIELD_USERNAME, EmailType::class, [
                'constraints' => [
                    new Required(),
                    new NotBlank(),
                ],
                'attr' => [
                    'placeholder' => 'Email Address',
                ],
            ]);

        return $this;
    }

    protected function addPasswordField(FormBuilderInterface $builder)
    {
        $builder
            ->add(self::FIELD_PASSWORD, PasswordType::class, [
                'constraints' => [
                    new Required(),
                    new NotBlank(),
                ],
                'attr' => [
                    'placeholder' => 'Password',
                    'autocomplete' => 'off',
                ],
            ]);

        return $this;
    }

    public function addCheckboxField(FormBuilderInterface $builder)
    {
        $builder
            ->add(self::FIELD_CHECKBOX, CheckboxType::class,[
            ]);
        return $this;
    }

}
