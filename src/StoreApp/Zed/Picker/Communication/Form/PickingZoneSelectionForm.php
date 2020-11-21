<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class PickingZoneSelectionForm extends AbstractType
{
    public const FIELD_PICKING_ZONE = 'fieldIdPickingZone';
    public const BUTTON_SUBMIT = 'buttonSubmit';

    public const OPTION_PICKING_ZONES = 'option_picking_zones';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_PICKING_ZONES);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addPickingZoneSelector($builder, $options);

        $builder->add(static::BUTTON_SUBMIT, SubmitType::class);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param mixed[] $options
     *
     * @return $this
     */
    protected function addPickingZoneSelector(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_PICKING_ZONE,
            ChoiceType::class,
            [
                'expanded' => true,
                'multiple' => false,
                'data' => $options['data'][static::FIELD_PICKING_ZONE],
                'choices' => array_flip($options[static::OPTION_PICKING_ZONES]),
                'placeholder' => false,
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }
}
