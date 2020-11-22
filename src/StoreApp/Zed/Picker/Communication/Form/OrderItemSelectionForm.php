<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form;

use Generated\Shared\Transfer\ItemTransfer;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use StoreApp\Shared\Picker\PickerConfig;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class OrderItemSelectionForm extends AbstractType
{
    public const FIELD_ID_SALES_ORDER = 'field_id_sales_order';
    public const FIELD_SALES_ORDER_CONTAINERS = 'field_sales_order_containers';

    public const PREFIX_FIELD_SALES_ORDER_ITEM_SKU = 'field_sales_order_item_sku__';
    public const PREFIX_FIELD_SALES_ORDER_ITEM_NEW_WEIGHT = 'field_sales_order_item_new_weight__';

    public const OPTION_SALES_ORDER_ITEMS = 'option_sales_order_items';
    public const OPTION_ITEM_ATTRIBUTES = 'OPTION_ITEM_ATTRIBUTES';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_SALES_ORDER_ITEMS);
        $resolver->setRequired(static::OPTION_ITEM_ATTRIBUTES);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addIdSalesOrder($builder);
        $this->addItems($builder, $options);
        $this->addContainers($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIdSalesOrder(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_ID_SALES_ORDER,
            HiddenType::class
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addItems(FormBuilderInterface $builder, array $options)
    {
        $itemTransfers = $this->getItemsFromOptions($options);

        foreach ($itemTransfers as $itemTransfer) {
            $builder->add(
                static::PREFIX_FIELD_SALES_ORDER_ITEM_SKU . $itemTransfer->getSku(),
                IntegerType::class,
                [
                    'required' => true,
                    'label' => $this->getItemDisplayName($itemTransfer, $options),
                    'data' => 0,
                    'attr' => [
                        'max' => $itemTransfer->getQuantity(),
                    ],
                    'constraints' => [
                        new NotBlank(),
                    ],
                ]
            );

            if ($itemTransfer->getWeightPerUnit()) {
                $weight = $itemTransfer->getWeightPerUnit() * $itemTransfer->getQuantity();

                $builder->add(
                    static::PREFIX_FIELD_SALES_ORDER_ITEM_NEW_WEIGHT . $itemTransfer->getSku(),
                    IntegerType::class,
                    [
                        'required' => true,
                        'data' => $weight,
                        'attr' => [
                            'min' => $weight * 0.8,
                            'max' => $weight * 1.2,
                        ],
                        'label' => 'storeapp.new_weight',
                        'constraints' => [
                            new NotBlank(),
                        ],
                    ]
                );
            }
        }

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addContainers(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            static::FIELD_SALES_ORDER_CONTAINERS,
            CollectionType::class,
            [
                'entry_type' => OrderItemContainerForm::class,
                'allow_add' => true,
                'allow_delete' => true,
                'label' => false,
                'entry_options' => [
                    'label' => 'Container',
                ],
                'prototype' => true,
                'prototype_name' => '__container_name__',
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        return $this;
    }

    /**
     * @param array $options
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    protected function getItemsFromOptions(array $options): array
    {
        return $options[OrderItemSelectionForm::OPTION_SALES_ORDER_ITEMS];
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param array $options
     *
     * @return string
     */
    protected function getItemDisplayName(ItemTransfer $itemTransfer, array $options): string
    {
        $concreteAttributesBySku = $options[self::OPTION_ITEM_ATTRIBUTES];
        $concreteAttributes = $concreteAttributesBySku[$itemTransfer->getSku()];

        $displayNameParts[] = sprintf(
            PickerConfig::FORMAT_ORDER_ITEM_NAME,
            $concreteAttributes[ProductConfig::KEY_PRODUCT_NUMBER],
            $concreteAttributes[ProductConfig::KEY_BON_TEXT]
        );

        if (isset($concreteAttributes[ProductConfig::PRODUCT_ATTRIBUTE_VARIETY])) {
            $displayNameParts[] = sprintf(
                PickerConfig::FORMAT_ORDER_ITEM_VARIETY_NAME,
                $concreteAttributes[ProductConfig::PRODUCT_ATTRIBUTE_VARIETY]
            );
        }

        return implode(' ', $displayNameParts);
    }
}
