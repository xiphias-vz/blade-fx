<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;

class FfSnippetEnablingForm extends abstractType
{
    public const RECOMMENDATIONS_FF_SNIPPET_ENABLED = "recommendationsFfSnippetEnabled";

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
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
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    public function addEnablingSnippetCheckBox(FormBuilderInterface $builder)
    {
        $builder->add(static::RECOMMENDATIONS_FF_SNIPPET_ENABLED, CheckboxType::class, [
            'label' => 'Enable Fact Finder snippet',
            'required' => false,
        ]);

        return $this;
    }
}
