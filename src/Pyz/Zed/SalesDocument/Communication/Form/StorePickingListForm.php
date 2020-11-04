<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \Pyz\Zed\SalesDocument\Communication\SalesDocumentCommunicationFactory getFactory()
 * @method \Pyz\Zed\SalesDocument\Business\SalesDocumentFacadeInterface getFacade()
 * @method \Pyz\Zed\SalesDocument\SalesDocumentConfig getConfig()
 */
class StorePickingListForm extends AbstractType
{
    public const FIELD_EXPORT_TYPE = 'export_type';
    public const FIELD_MERCHANT_REFERENCE = 'merchant';
    public const FIELD_PICKING_DATE = 'picking_date';

    public const OPTION_MERCHANT_REFERENCES = 'option_merchant_selection';
    public const OPTION_EXPORT_TYPES = 'option_export_type_selection';

    public const OPTION_EXPORT_TYPE_HTML = 'HTML';
    public const OPTION_EXPORT_TYPE_PDF = 'PDF';

    public const VALIDITY_DATE_FORMAT = 'yyyy-MM-dd';
    public const SALES_DOCUMENT_STORE_PICKING_FORM_MERCHANT_SELECTOR_LABEL = 'sales-document.store-picking.form.merchant-selector';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_MERCHANT_REFERENCES);
        $resolver->setRequired(static::OPTION_EXPORT_TYPES);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addPickingDate($builder);
        $this->addMerchantSelector($builder, $options);
        $this->addExportTypeSelector($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addPickingDate(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_PICKING_DATE,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATE_FORMAT,
                'label' => 'sales-document.store-picking.html-template.delivery-date',
                'widget' => 'single_text',
                'required' => false,
                'attr' => [
                    'class' => 'datepicker js-date-from',
                    'readonly' => 'readonly',
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'validation.not_blank',
                    ]),
                ],
            ]
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addMerchantSelector(FormBuilderInterface $builder, array $options)
    {
        $fieldOptions = [
            'label' => static::SALES_DOCUMENT_STORE_PICKING_FORM_MERCHANT_SELECTOR_LABEL,
            'expanded' => false,
            'multiple' => false,
            'required' => true,
            'data' => '',
            'choices' => array_flip($options[static::OPTION_MERCHANT_REFERENCES]),
            'constraints' => [
                new NotBlank(),
            ],
        ];

        $builder->add(
            static::FIELD_MERCHANT_REFERENCE,
            ChoiceType::class,
            $fieldOptions
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addExportTypeSelector(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_EXPORT_TYPE,
            ChoiceType::class,
            [
                'label' => 'sales-document.store-picking.form.export-types',
                'expanded' => false,
                'multiple' => false,
                'required' => true,
                'choices' => array_combine($options[static::OPTION_EXPORT_TYPES], $options[static::OPTION_EXPORT_TYPES]),
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }
}
