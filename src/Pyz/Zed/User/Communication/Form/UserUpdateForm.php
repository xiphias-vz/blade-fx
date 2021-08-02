<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Form;

use Spryker\Zed\User\Communication\Form\UserUpdateForm as SprykerUserUpdateForm;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;

/**
 * @method \Pyz\Zed\User\Business\UserFacadeInterface getFacade()
 * @method \Pyz\Zed\User\Communication\UserCommunicationFactory getFactory()
 * @method \Spryker\Zed\User\Persistence\UserQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\User\UserConfig getConfig()
 */
class UserUpdateForm extends SprykerUserUpdateForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if ($this->getFacade()->isCurrentUserSupervisor()) {
            $this
                ->addEmailField($builder)
                ->addPasswordField($builder);
        } else {
            $this
                ->addEmailField($builder)
                ->addPasswordField($builder)
                ->addFirstNameField($builder)
                ->addLastNameField($builder);

            $groupChoices = $options[self::OPTION_GROUP_CHOICES];
            if ($groupChoices) {
                $this->addGroupField($builder, $options[self::OPTION_GROUP_CHOICES]);
            }

            $this->executeFormExpanderPlugins($builder);

            $builder->add(self::FIELD_STATUS, ChoiceType::class, [
                'choices' => array_flip($options[self::OPTION_STATUS_CHOICES]),
            ]);
        }
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addPasswordField(FormBuilderInterface $builder)
    {
        $builder
            ->add(self::FIELD_PASSWORD, RepeatedType::class, [
                'invalid_message' => 'The password fields must match.',
                'first_options' => ['label' => 'Password', 'attr' => ['autocomplete' => 'off']],
                'second_options' => ['label' => 'Repeat Password', 'attr' => ['autocomplete' => 'off']],
                'required' => false,
                'type' => PasswordType::class,
                'constraints' => [
                    $this->getFacade()->isEditedUserPicker() ?
                        new Length([
                        'min' => $this->getConfig()->getPickerPasswordLength(),
                        'max' => $this->getConfig()->getPickerPasswordLength(),
                        ])
                        :
                        $this->getFactory()->createPasswordConstraint(),

                ],
            ]);

        return $this;
    }
}
