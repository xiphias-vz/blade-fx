<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication\Form;

use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalHardMaxThresholdType;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalHardThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType as SprykerGlobalThresholdType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \Spryker\Zed\SalesOrderThresholdGui\Communication\SalesOrderThresholdGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiConfig getConfig()
 */
class GlobalThresholdType extends SprykerGlobalThresholdType
{
    public const FIELD_HARD_MAX = 'hardMaxThreshold';

    public const OPTION_HARD_MAX_TYPES_ARRAY = 'option-hard-max-types-array';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->addStoreCurrencyField($builder, $options);
        $this->addHardThresholdForm($builder, $options);
        $this->addHardThresholdMaxForm($builder, $options);

        $this->addPluginForms($builder, $options);
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        parent::configureOptions($resolver);

        $resolver->setRequired(static::OPTION_HARD_MAXIMUM_TYPES_ARRAY);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \Spryker\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType
     */
    protected function addHardThresholdForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_HARD, GlobalHardThresholdType::class, [
            static::OPTION_HARD_TYPES_ARRAY => $options[static::OPTION_HARD_TYPES_ARRAY],
            static::OPTION_CURRENCY_CODE => $options[static::OPTION_CURRENCY_CODE],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \Spryker\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType
     */
    protected function addHardThresholdMaxForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_HARD_MAX, GlobalHardMaxThresholdType::class, [
            static::OPTION_HARD_MAXIMUM_TYPES_ARRAY => $options[static::OPTION_HARD_MAXIMUM_TYPES_ARRAY],
            static::OPTION_CURRENCY_CODE => $options[static::OPTION_CURRENCY_CODE],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormBuilderInterface
     */
    protected function addPluginForms(FormBuilderInterface $builder, array $options): FormBuilderInterface
    {
        foreach ($this->getFactory()->getSalesOrderThresholdFormExpanderPlugins() as $formExpanderPlugin) {
            if ($formExpanderPlugin->getThresholdKey() === SalesOrderThresholdConfig::THRESHOLD_STRATEGY_KEY_HARD_MAX) {
                $formExpanderPlugin->expand($builder->get(static::FIELD_HARD_MAX), $options);
                continue;
            }

            if ($formExpanderPlugin->getThresholdKey() === SalesOrderThresholdConfig::THRESHOLD_STRATEGY_KEY_HARD) {
                $formExpanderPlugin->expand($builder->get(static::FIELD_HARD), $options);
            }
        }

        return $builder;
    }
}
