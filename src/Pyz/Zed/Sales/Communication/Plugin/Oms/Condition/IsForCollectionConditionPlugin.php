<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 */
class IsForCollectionConditionPlugin extends AbstractCondition
{
    /**
     * @var array
     */
    private static $orderCheckResult = [];

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        $idSalesOrder = $orderItem->getFkSalesOrder();

        if (isset(static::$orderCheckResult[$idSalesOrder])) {
            return static::$orderCheckResult[$idSalesOrder];
        }

        static::$orderCheckResult[$idSalesOrder] = $this->getIsClickAndCollectOrder($orderItem);

        return static::$orderCheckResult[$idSalesOrder];
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    private function getIsClickAndCollectOrder(SpySalesOrderItem $orderItem): bool
    {
        $shipment = $orderItem->getSpySalesShipment();

        // for backward compatibility with old shipments
        if (empty($shipment->getShipmentMethodKey())) {
            return $this->getFacade()->checkOrderShipment(
                $orderItem->getFkSalesShipment(),
                ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT
            );
        }

        return $shipment->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT;
    }
}
