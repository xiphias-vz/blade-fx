<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @method \Pyz\Zed\PostingExport\Communication\PostingExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\PostingExport\PostingExportConfig getConfig()
 * @method \Pyz\Zed\PostingExport\Business\PostingExportFacadeInterface getFacade()
 */
class ExportForm extends AbstractType
{
    public const FIELD_DATE_FROM = 'date-from';
    public const FIELD_DATE_TO = 'date-to';
    public const VALIDITY_DATE_FORMAT = 'yyyy-MM-dd';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addDateFromField($builder)
            ->addDateToField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addDateFromField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_DATE_FROM,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATE_FORMAT,
                'label' => 'Date From',
                'widget' => 'single_text',
                'required' => false,
                'attr' => [
                    'class' => 'datepicker js-date-from safe-datetime',
                    'readonly' => 'readonly',
                ],
                'constraints' => [
                    new NotBlank(),
                    new Callback([
                        'callback' => function ($dateFrom, ExecutionContextInterface $context) {
                            if (!$dateFrom || !isset($context->getRoot()->getData()[static::FIELD_DATE_TO])) {
                                return;
                            }

                            if ($dateFrom > $context->getRoot()->getData()[static::FIELD_DATE_TO]) {
                                $context->addViolation('Date from cannot be later than Date to.');
                            }
                        },
                    ]),
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
    protected function addDateToField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_DATE_TO,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATE_FORMAT,
                'label' => 'Date To',
                'widget' => 'single_text',
                'required' => false,
                'attr' => [
                    'class' => 'datepicker js-date-to safe-datetime',
                    'readonly' => 'readonly',
                ],
                'constraints' => [
                    new NotBlank(),
                    new Callback([
                        'callback' => function ($dateTo, ExecutionContextInterface $context) {
                            if (!$dateTo || !isset($context->getRoot()->getData()[static::FIELD_DATE_FROM])) {
                                return;
                            }

                            if ($dateTo && ($dateTo < $context->getRoot()->getData()[static::FIELD_DATE_FROM])) {
                                $context->addViolation('Date to cannot be earlier than Date from.');
                            }
                        },
                    ]),
                ],
            ]
        );

        return $this;
    }
}
