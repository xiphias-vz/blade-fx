<?php


namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\GuestForm as SprykerGuestForm;
use Symfony\Component\Form\FormBuilderInterface;


class GuestForm extends SprykerGuestForm
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addSalutationField($builder)
            ->addFirstNameField($builder)
            ->addLastNameField($builder)
            ->addEmailField($builder)
            ->addIsGuestField($builder);
    }
}
