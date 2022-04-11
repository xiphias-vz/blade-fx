<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

class FfSnippetEnablingForm extends abstractType
{
    public const RECOMMENDATIONS_FF_SNIPPET_ENABLED = "recommendationsFfSnippetEnabled";

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addEnablingSnippetCheckBox($builder);
    }

    /**
     * @param FormBuilderInterface $builder
     *
     * @return $this
     */
    public function addEnablingSnippetCheckBox(FormBuilderInterface $builder): FfSnippetEnablingForm
    {
        $builder->add(static::RECOMMENDATIONS_FF_SNIPPET_ENABLED, CheckboxType::class, [
            'label'    => 'Enable Fact Finder snippet',
            'required' => false,
        ]);

        return $this;
    }
}
