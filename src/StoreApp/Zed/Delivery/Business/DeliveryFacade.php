<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Business;

use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \StoreApp\Zed\Delivery\Business\DeliveryBusinessFactory getFactory()
 */
class DeliveryFacade extends AbstractFacade implements DeliveryFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function markOrderItemsAsDelivered(array $idSalesOrderItems): void
    {
        $this->getFactory()->getOmsFacade()->triggerEventForOrderItems(
            OmsConfig::STORE_EVENT_CONFIRM_DELIVERY,
            $idSalesOrderItems
        );
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsDeliveryStarted(array $idSalesOrderItems): void
    {
        $this->getFactory()->getOmsFacade()->triggerEventForOrderItems(
            OmsConfig::STORE_EVENT_START_DELIVERY,
            $idSalesOrderItems
        );
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsDeliveryCancelledByCustomer(array $idSalesOrderItems): void
    {
        $this->getFactory()->getOmsFacade()->triggerEventForOrderItems(
            OmsConfig::STORE_EVENT_CANCEL_DELIVERY_BY_CUSTOMER,
            $idSalesOrderItems
        );
    }
}
