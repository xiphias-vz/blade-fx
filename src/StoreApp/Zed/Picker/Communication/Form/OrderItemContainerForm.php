<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form;

use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class OrderItemContainerForm extends AbstractType
{
    public const FIELD_CODE = 'container_code';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->addCode($builder);
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PickingSalesOrderTransfer::class,
        ]);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addCode(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_CODE,
            TextType::class,
            [
                'required' => false,
                'label' => false,
                'constraints' => [
                    new Callback([
                        'callback' => function ($dataFrom, ExecutionContextInterface $context) {
                            $data = $context->getRoot()->getData();
                            $overallQuantity = 0;
                            foreach ($data as $itemKey => $itemValue) {
                                if (strstr($itemKey, OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_SKU)) {
                                    $overallQuantity += $itemValue;
                                }
                            }

                            if ($overallQuantity === 0) {
                                return;
                            }

                            foreach ($data[OrderItemSelectionForm::FIELD_SALES_ORDER_CONTAINERS] as $container) {
                                if (!$container[PickingSalesOrderTransfer::CONTAINER_CODE]) {
                                    $context->addViolation('Dieser Wert sollte nicht leer sein.');
                                }
                            }
                        },
                    ]),
                    new Length(['min' => 4]),
                ],
            ]
        );

        return $this;
    }
}
