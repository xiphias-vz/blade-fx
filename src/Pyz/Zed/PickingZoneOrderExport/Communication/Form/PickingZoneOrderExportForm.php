<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Form;

use DateTime;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Communication\PickingZoneOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface getFacade()
 * @method \Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportConfig getConfig()
 */
class PickingZoneOrderExportForm extends AbstractType
{
    public const FIELD_PICKING_ZONE_ID = 'picking_zone_id';
    public const FIELD_PICKING_DATE = 'picking_date';
    public const VALIDITY_DATE_FORMAT = 'yyyy-MM-dd';

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
        $this
            ->addPickingZoneField($builder, $options)
            ->addPickingDateField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param mixed[] $options
     *
     * @return $this
     */
    protected function addPickingZoneField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_PICKING_ZONE_ID,
            ChoiceType::class,
            [
                'label' => 'picking_zone_order_export_gui.field.picking_zone_id',
                'expanded' => false,
                'multiple' => false,
                'required' => true,
                'choices' => array_flip($options[static::OPTION_PICKING_ZONES]),
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addPickingDateField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_PICKING_DATE,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATE_FORMAT,
                'label' => 'picking_zone_order_export_gui.field.picking_date',
                'widget' => 'single_text',
                'required' => true,
                'data' => new DateTime('now'),
                'attr' => [
                    'class' => 'datepicker js-picking-date-field safe-datetime',
                    'readonly' => 'readonly',
                ],
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }
}
