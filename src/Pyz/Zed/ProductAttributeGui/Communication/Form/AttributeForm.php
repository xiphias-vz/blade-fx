<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttributeGui\Communication\Form;

use Spryker\Zed\ProductAttributeGui\Communication\Form\AttributeForm as SprykerAttributeForm;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraint;

/**
 * @method \Spryker\Zed\ProductAttributeGui\Communication\ProductAttributeGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\ProductAttributeGui\ProductAttributeGuiConfig getConfig()
 */
class AttributeForm extends SprykerAttributeForm
{
    public const FIELD_EXPORT_TO_FF = 'ff_export';

    public const OPTION_FF_EXPORT_CHOICE = "ff_export_choice";

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired([
            self::OPTION_ATTRIBUTE_TYPE_CHOICES,
            self::OPTION_VALUES_CHOICES,
            self::OPTION_FF_EXPORT_CHOICE,
        ]);

        $resolver->setDefaults([
            self::OPTION_IS_UPDATE => false,
            'required' => false,
            'validation_groups' => function (FormInterface $form) {
                $groups = [Constraint::DEFAULT_GROUP];
                $originalData = $form->getConfig()->getData();
                $submittedData = $form->getData();

                if (!isset($submittedData[self::FIELD_ALLOW_INPUT]) || !$submittedData[self::FIELD_ALLOW_INPUT] ||
                    (isset($submittedData[self::FIELD_IS_SUPER]) && $submittedData[self::FIELD_IS_SUPER])
                ) {
                    $groups[] = self::GROUP_VALUES;
                }

                if (!isset($originalData[self::FIELD_KEY]) || $submittedData[self::FIELD_KEY] !== $originalData[self::FIELD_KEY]) {
                    $groups[] = self::GROUP_UNIQUE_KEY;
                }

                return $groups;
            },
        ]);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
           $this->addExportToFfField($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addExportToFfField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(self::FIELD_EXPORT_TO_FF, CheckboxType::class, [
            'label' => 'Export to Factfinder',
            'attr' => [ 'checked' => $options[self::OPTION_FF_EXPORT_CHOICE]],
        ]);

        return $this;
    }
}
