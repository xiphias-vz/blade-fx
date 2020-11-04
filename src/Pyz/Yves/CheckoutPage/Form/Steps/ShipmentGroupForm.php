<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Form\Steps;

use SprykerShop\Yves\CheckoutPage\Form\Steps\ShipmentGroupForm as SprykerShipmentGroupForm;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class ShipmentGroupForm extends SprykerShipmentGroupForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addShipmentSubForm(FormBuilderInterface $builder, array $options)
    {
        $shipmentGroupHash = $this->shipmentGroupTransfer->getHash();
        $availableShipmentMethods = $options[ShipmentCollectionForm::OPTION_SHIPMENT_METHODS_BY_GROUP][$shipmentGroupHash] ?? [];
        $shippingAddressLabel = $options[ShipmentCollectionForm::OPTION_SHIPMENT_ADDRESS_LABEL_LIST][$shipmentGroupHash] ?? '';

        $builder->add(static::FIELD_SHIPMENT, MultiShipmentForm::class, [
            'required' => true,
            'label' => $shippingAddressLabel,
            MultiShipmentForm::OPTION_SHIPMENT_METHODS => $availableShipmentMethods,
        ]);

        return $this;
    }
}
