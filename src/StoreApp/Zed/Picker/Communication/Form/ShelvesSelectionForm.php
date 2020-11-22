<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form;

use ArrayObject;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class ShelvesSelectionForm extends AbstractType
{
    public const OPTION_PICKING_SALES_ORDERS = 'option_order_containers';
    public const PREFIX_FIELD_CONTAINER_CODE = 'field_container_code__';
    public const FIELD_ID_SALES_ORDER = 'field_id_sales_order';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_PICKING_SALES_ORDERS);
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
        $this->addShelvesSelector($builder, $options);
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
    protected function addShelvesSelector(FormBuilderInterface $builder, array $options)
    {
        $pickingSalesOrderTransfers = $this->getPickingSalesOrdersFromOptions($options);

        foreach ($pickingSalesOrderTransfers as $pickingSalesOrderTransfer) {
            $builder->add(
                static::PREFIX_FIELD_CONTAINER_CODE . $pickingSalesOrderTransfer->getContainerCode(),
                TextType::class,
                [
                    'required' => true,
                    'label' => sprintf('Container ID (%s)', $pickingSalesOrderTransfer->getContainerCode()),
                    'data' => 0,
                    'constraints' => [
                        new NotBlank(),
                        new Length(['min' => 4]),
                    ],
                ]
            );
        }

        return $this;
    }

    /**
     * @param array $options
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\PickingSalesOrderTransfer[]
     */
    protected function getPickingSalesOrdersFromOptions(array $options): ArrayObject
    {
        return $options[ShelvesSelectionForm::OPTION_PICKING_SALES_ORDERS];
    }
}
