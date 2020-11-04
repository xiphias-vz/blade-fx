<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Payone\Form;

use SprykerEco\Shared\Payone\PayoneApiConstants;
use SprykerEco\Yves\Payone\Form\EWalletSubForm as SprykerEcoEWalletSubForm;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;

class EWalletSubForm extends SprykerEcoEWalletSubForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $choices
     *
     * @return $this
     */
    protected function addWalletType(FormBuilderInterface $builder, array $choices)
    {
        $builder->add(
            static::FIELD_WALLET_TYPE,
            HiddenType::class,
            [
                'required' => true,
                'data' => PayoneApiConstants::E_WALLET_TYPE_PAYPAL,
            ]
        );

        return $this;
    }
}
