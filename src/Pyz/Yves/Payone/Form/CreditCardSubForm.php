<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Payone\Form;

use SprykerEco\Yves\Payone\Form\CreditCardSubForm as SprykerEcoCreditCardSubForm;
use Symfony\Component\Form\FormBuilderInterface;

class CreditCardSubForm extends SprykerEcoCreditCardSubForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addNameOnCard($builder)
            ->addHiddenInputs($builder);
    }
}
