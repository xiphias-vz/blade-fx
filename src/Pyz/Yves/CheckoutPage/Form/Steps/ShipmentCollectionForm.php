<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Form\Steps;

use SprykerShop\Yves\CheckoutPage\Form\Steps\ShipmentCollectionForm as SprykerShipmentCollectionForm;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;

class ShipmentCollectionForm extends SprykerShipmentCollectionForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addShipmentGroupsSubForm(FormBuilderInterface $builder, array $options)
    {
        /** @var \ArrayObject|\Generated\Shared\Transfer\ShipmentGroupTransfer $shipmentGroupCollection */
        $shipmentGroupCollection = $options[static::OPTION_SHIPMENT_GROUPS];

        $builder->add(static::FIELD_SHIPMENT_GROUP_COLLECTION, CollectionType::class, [
            'entry_type' => ShipmentGroupForm::class,
            'data' => $shipmentGroupCollection->getArrayCopy(),
            'mapped' => false,
            'entry_options' => [
                static::OPTION_SHIPMENT_GROUPS => $shipmentGroupCollection,
                static::OPTION_SHIPMENT_METHODS_BY_GROUP => $options[static::OPTION_SHIPMENT_METHODS_BY_GROUP],
                static::OPTION_SHIPMENT_ADDRESS_LABEL_LIST => $options[static::OPTION_SHIPMENT_ADDRESS_LABEL_LIST],
            ],
        ]);

        return $this;
    }
}
