<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class ScenarioForm extends AbstractType
{
    public const FIELD_ID_RECOMMENDATION_SCENARIOS = 'idRecommendationScenarios';
    public const FIELD_SCENARIO_ID = 'scenarioId';
    public const FIELD_HASH_ID = 'hashId';

    public const FIELD_ALLOW_INPUT = 'allow_input';
    public const FIELD_VALUES = 'values';

    public const OPTION_RECOMMENDATIONS_TYPE_CHOICES = 'recommendations_type_choices';

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addIdRecomendationSenariosField($builder)
            ->addScenarioIdField($builder)
            ->addHashIdField($builder);
    }

    /**
     * @param FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIdRecomendationSenariosField(FormBuilderInterface $builder): ScenarioForm
    {
        $builder->add(self::FIELD_ID_RECOMMENDATION_SCENARIOS, HiddenType::class);

        return $this;
    }

    /**
     * @param FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addScenarioIdField(FormBuilderInterface $builder): ScenarioForm
    {
        $builder->add(self::FIELD_SCENARIO_ID, TextType::class, [
            'label' => 'Scenario ID',
            'constraints' => [
                new NotBlank(),
            ],
            'attr' => [
                'placeholder' => 'Type Scenario Name/ID',
            ],
        ]);

        return $this;
    }

    /**
     * @param FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addHashIdField(FormBuilderInterface $builder): ScenarioForm
    {
        $builder->add(self::FIELD_HASH_ID, TextType::class, [
            'label' => 'Hash ID',
            'constraints' => [
                new NotBlank(),
            ],
            'attr' => [
                'placeholder' => 'Scenarios Hash Name/ID',
            ]
        ]);

        return $this;
    }

}
