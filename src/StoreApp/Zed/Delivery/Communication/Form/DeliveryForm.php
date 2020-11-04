<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Communication\Form;

use ArrayObject;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Delivery\DeliveryConfig getConfig()
 */
class DeliveryForm extends AbstractType
{
    public const FORMAT_FIELD_ID_SALES_ORDER = 'field_id_sales_order_';

    public const OPTION_DELIVERY_ORDERS = 'option_delivery_orders';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(static::OPTION_DELIVERY_ORDERS);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addDeliveryOrders($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addDeliveryOrders(FormBuilderInterface $builder, array $options)
    {
        $defaultOptions = [
            'required' => false,
        ];

        foreach ($this->getDeliveryOrdersFromOptions($options) as $deliveryOrderTransfer) {
            $builder->add(
                static::FORMAT_FIELD_ID_SALES_ORDER . $deliveryOrderTransfer->getIdSalesOrder(),
                CheckboxType::class,
                array_merge(
                    $defaultOptions,
                    [
                        'data' => $deliveryOrderTransfer->getIsStarted(),
                    ]
                )
            );
        }

        return $this;
    }

    /**
     * @param array $options
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\DeliveryOrderTransfer[]
     */
    protected function getDeliveryOrdersFromOptions(array $options): ArrayObject
    {
        return $options[DeliveryForm::OPTION_DELIVERY_ORDERS];
    }
}
