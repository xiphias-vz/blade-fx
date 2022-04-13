<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 * @method \Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface getFacade()
 * @method \Pyz\Zed\Recommendations\RecommendationsConfig getConfig()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 */
class ScenarioForm extends AbstractType
{
    public const FIELD_ID_RECOMMENDATION_SCENARIOS = 'idRecommendationScenarios';
    public const FIELD_SCENARIO_ID = 'scenarioId';
    public const FIELD_HASH_ID = 'hashId';
    public const FIELD_ACTIVE = 'active';

    public const FIELD_ALLOW_INPUT = 'allow_input';
    public const FIELD_VALUES = 'values';

    public const OPTION_RECOMMENDATIONS_TYPE_CHOICES = 'recommendations_type_choices';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addIdRecomendationSenariosField($builder)
            ->addHashIdField($builder)
            ->addScenarioIdField($builder)
            ->addActivatedField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addHashIdField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_HASH_ID, HiddenType::class);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIdRecomendationSenariosField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ID_RECOMMENDATION_SCENARIOS, HiddenType::class);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addScenarioIdField(FormBuilderInterface $builder)
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
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addActivatedField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_ACTIVE, CheckboxType::class, [
            'label' => 'Active',
            'required' => false,
        ]);

        return $this;
    }
}
