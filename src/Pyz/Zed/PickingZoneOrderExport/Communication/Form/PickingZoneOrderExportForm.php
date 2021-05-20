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
    public const FIELD_PICKING_STORE = 'picking_store';
    public const FIELD_PICKING_TIMESLOTS = 'picking_time_slots';
    public const FIELD_PICKING_STATUS = 'picking_time_status';
    public const FIELD_PICKING_DATE = 'picking_date';
    public const VALIDITY_DATE_FORMAT = 'yyyy-MM-dd';

    public const OPTION_PICKING_ZONES = 'option_picking_zones';
    public const OPTION_PICKING_STORES = 'option_picking_stores';
    public const OPTION_PICKING_STATUS = 'option_picking_status';
    public const OPTION_PICKING_TIMESLOTS = 'option_picking_time_slots';

    private const STATUS_DATA = [
        'ready for picking' => 'ready for picking',
        'picked' => 'picked',
        'ready for collection' => 'ready for collection',
        'paused' => 'paused',
    ];

    private const TIMESLOTS_DATA = [
        '10:00-12:00' => '10:00-12:00',
        '12:00-14:00' => '12:00-14:00',
        '14:00-16:00' => '14:00-16:00',
        '16:00-18:00' => '16:00-18:00',
        '18:00-20:00' => '18:00-20:00',
        '10:00-18:00' => '10:00-18:00',
    ];

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_PICKING_ZONES);
        $resolver->setRequired(static::OPTION_PICKING_STORES);
        $resolver->setRequired(static::OPTION_PICKING_TIMESLOTS);
        $resolver->setRequired(static::OPTION_PICKING_STATUS);
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
            ->addPickingStoreField($builder, $options)
            ->addPickingDateField($builder)
            ->addPickingTimeSlotsField($builder, $options)
            ->addPickingStatusField($builder, $options);
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
     * @param mixed[] $options
     *
     * @return $this
     */
    protected function addPickingStoreField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_PICKING_STORE,
            ChoiceType::class,
            [
                'label' => 'picking_zone_order_export_gui.field.picking_store',
                'expanded' => false,
                'multiple' => false,
                'required' => true,
                'choices' => $options[static::OPTION_PICKING_STORES],
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

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param mixed[] $options
     *
     * @return $this
     */
    protected function addPickingTimeSlotsField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_PICKING_TIMESLOTS,
            ChoiceType::class,
            [
                'label' => 'picking_zone_order_export_gui.field.picking_time_slots',
                'expanded' => true,
                'multiple' => true,
                'required' => true,
                'choices' => array_flip(self::TIMESLOTS_DATA),
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param mixed[] $options
     *
     * @return $this
     */
    protected function addPickingStatusField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_PICKING_STATUS,
            ChoiceType::class,
            [
                'label' => 'picking_zone_order_export_gui.field.picking_time_status',
                'expanded' => false,
                'multiple' => false,
                'required' => true,
                'choices' => array_flip(self::STATUS_DATA),
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }
}
