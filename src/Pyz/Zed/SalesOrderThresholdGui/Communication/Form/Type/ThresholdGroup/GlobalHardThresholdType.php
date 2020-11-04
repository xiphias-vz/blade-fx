<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup;

use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalHardThresholdType as SprykerGlobalHardThresholdType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @method \Spryker\Zed\SalesOrderThresholdGui\Communication\SalesOrderThresholdGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiConfig getConfig()
 */
class GlobalHardThresholdType extends SprykerGlobalHardThresholdType
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->addStrategyField($builder, $options[GlobalThresholdType::OPTION_HARD_TYPES_ARRAY]);
        $this->addThresholdValueField($builder, $options);
        $this->addLocalizedForms($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addThresholdValueField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_THRESHOLD, MoneyType::class, [
            'label' => 'Enter threshold value',
            'currency' => $options[GlobalThresholdType::OPTION_CURRENCY_CODE],
            'divisor' => 100,
            'constraints' => [
                new Range(['min' => 0]),
                $this->getFactory()->createThresholdStrategyConstraint(),
                new Callback([
                    'callback' => function ($thresholdMinValue, ExecutionContextInterface $context) {
                        $thresholdMaxValue = $context->getRoot()->getData()[GlobalThresholdType::FIELD_HARD_MAX][static::FIELD_THRESHOLD];
                        if (!$thresholdMinValue || !isset($thresholdMaxValue)) {
                            return;
                        }

                        if ($thresholdMinValue > $thresholdMaxValue || $thresholdMaxValue === $thresholdMinValue) {
                            $context->addViolation('Minimum order value cannot be greater or equal to the maximum order value.');
                        }
                    },
                ]),
            ],
            'required' => false,
        ]);

        return $this;
    }
}
