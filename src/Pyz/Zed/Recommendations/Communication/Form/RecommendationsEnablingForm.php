<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 * @method \Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface getFacade()
 * @method \Pyz\Zed\Recommendations\RecommendationsConfig getConfig()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 */
class RecommendationsEnablingForm extends AbstractType
{
    public const FIELD_ARE_RECOMMENDATIONS_ENABLED = 'recommendationsEnabled';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addRecommendationsEnabledCheckBox($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    public function addRecommendationsEnabledCheckBox(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_ARE_RECOMMENDATIONS_ENABLED, CheckboxType::class, [
            'label' => 'Use recommendations',
            'required' => false,
        ]);

        return $this;
    }
}
