<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Form\Steps;

use Generated\Shared\Transfer\ShipmentTransfer;
use SprykerShop\Yves\CheckoutPage\Form\Steps\MultiShipmentForm as SprykerMultiShipmentForm;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\Regex;

class MultiShipmentForm extends SprykerMultiShipmentForm
{
    protected const VALIDATION_WRONG_FORMAT_MESSAGE = 'validation.wrong_format';
    protected const VALIDATION_REQUEST_DELIVERY_DATE_FORMAT = "/^\d{4}-\d{2}-\d{2}_\d{2}:\d{2}-\d{2}:\d{2}$/";

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addRequestedDeliveryDateField(FormBuilderInterface $builder)
    {
        $builder->add(ShipmentTransfer::REQUESTED_DELIVERY_DATE, TextType::class, [
            'label' => 'page.checkout.shipment.requested_delivery_date.label',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createFormatConstraint(),
            ],
        ]);

        return $this;
    }

    /**
     * @return \Symfony\Component\Validator\Constraint
     */
    protected function createFormatConstraint(): Constraint
    {
        return new Regex([
            'message' => static::VALIDATION_WRONG_FORMAT_MESSAGE,
            'pattern' => static::VALIDATION_REQUEST_DELIVERY_DATE_FORMAT,
        ]);
    }
}
