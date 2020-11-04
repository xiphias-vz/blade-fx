<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Communication\Form\DataProvider;

use Generated\Shared\Transfer\DeliveryOrderCollectionTransfer;
use StoreApp\Zed\Delivery\Communication\Form\DeliveryForm;

class DeliveryFormDataProvider
{
    /**
     * @param \Generated\Shared\Transfer\DeliveryOrderCollectionTransfer $deliveryOrderCollectionTransfer
     *
     * @return array
     */
    public function getOptions(DeliveryOrderCollectionTransfer $deliveryOrderCollectionTransfer): array
    {
        return [
            DeliveryForm::OPTION_DELIVERY_ORDERS => $deliveryOrderCollectionTransfer->getReadyForDeliveryOrders(),
        ];
    }
}
