<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Communication\FormExpander;

use Spryker\Zed\Gui\Communication\Form\Type\SelectType;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \Spryker\Zed\UserLocaleGui\Communication\UserLocaleGuiCommunicationFactory getFactory()
 * @method \Pyz\Zed\Merchant\Business\MerchantFacadeInterface getFacade()
 * @method \Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface getRepository()
 * @method \Spryker\Zed\Merchant\MerchantConfig getConfig()
 */
class MerchantFormExpander extends AbstractType
{
    protected const FIELD_MERCHANT_REFERENCE = 'merchant_reference';

    public const OPTIONS_MERCHANTS = 'OPTIONS_MERCHANTS';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        parent::configureOptions($resolver);
        $resolver->setRequired(static::OPTIONS_MERCHANTS);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->addMerchantsField($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    protected function addMerchantsField(FormBuilderInterface $builder, array $options): void
    {
        $builder->add(static::FIELD_MERCHANT_REFERENCE, SelectType::class, [
            'label' => 'Merchant',
            'choices' => $options[static::OPTIONS_MERCHANTS],
            'required' => false,
        ]);
    }
}
