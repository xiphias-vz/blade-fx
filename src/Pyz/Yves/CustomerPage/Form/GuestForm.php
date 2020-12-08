<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\GuestForm as SprykerGuestForm;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class GuestForm extends SprykerGuestForm
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
            ->addEmailField($builder)
            ->addIsGuestField($builder);
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
}
