<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Form;

use DateTime;
use Spryker\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit as SpyProductConcreteFormEdit;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class ProductConcreteFormEdit extends SpyProductConcreteFormEdit
{
    public const VALIDITY_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \Spryker\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit
     */
    protected function addValidFromField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_VALID_FROM,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATETIME_FORMAT,
                'label' => 'Valid From (GMT)',
                'time_widget' => 'single_text',
                'date_widget' => 'single_text',
                'required' => false,
                'constraints' => [
                    new Callback([
                        'callback' => function ($newFrom, ExecutionContextInterface $context) {
                            $formData = $context->getRoot()->getData();

                            if (!$newFrom) {
                                return;
                            }

                            if (empty($formData[static::FIELD_VALID_TO])) {
                                return;
                            }

                            $newValidFromDateTime = new DateTime($newFrom);
                            $validToDateTime = new DateTime($formData[static::FIELD_VALID_TO]);

                            if ($newValidFromDateTime > $validToDateTime) {
                                $context->addViolation('Date "Valid from" can not be later than "Valid to".');
                            }

                            if ($newValidFromDateTime->format('c') === $validToDateTime->format('c')) {
                                $context->addViolation('Date "Valid from" can not be the same as "Valid to".');
                            }
                        },
                    ]),
                ],
            ]
        );

        $this->addDateTimeTransformer(static::FIELD_VALID_FROM, $builder);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addValidToField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_VALID_TO,
            DateTimeType::class,
            [
                'format' => static::VALIDITY_DATETIME_FORMAT,
                'label' => 'Valid To (GMT)',
                'date_widget' => 'single_text',
                'time_widget' => 'single_text',
                'required' => false,
                'constraints' => [
                    new Callback([
                        'callback' => function ($newTo, ExecutionContextInterface $context) {
                            $formData = $context->getRoot()->getData();

                            if (!$newTo) {
                                return;
                            }

                            if (empty($formData[static::FIELD_VALID_FROM])) {
                                return;
                            }

                            $newValidToDateTime = new DateTime($newTo);
                            $validFromDateTime = new DateTime($formData[static::FIELD_VALID_FROM]);

                            if ($newValidToDateTime < $validFromDateTime) {
                                $context->addViolation('Date "Valid to" can not be earlier than "Valid from".');
                            }
                        },
                    ]),
                ],
            ]
        );

        $this->addDateTimeTransformer(static::FIELD_VALID_TO, $builder);

        return $this;
    }
}
