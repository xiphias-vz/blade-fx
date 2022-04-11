<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Mpdf\Form;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

class RecommendationsEnablingForm extends AbstractType
{
    public const FIELD_ARE_RECOMMENDATIONS_ENABLED = 'recommendationsEnabled';
    /**
     * @param FormBuilderInterface $builder
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
     * @param FormBuilderInterface $builder
     *
     * @return $this
     */
    public function addRecommendationsEnabledCheckBox(FormBuilderInterface $builder): RecommendationsEnablingForm
    {
        $builder->add(static::FIELD_ARE_RECOMMENDATIONS_ENABLED, CheckboxType::class, [
            'label'    => 'Use recommendations',
            'required' => false,
        ]);

        return $this;
    }
}
