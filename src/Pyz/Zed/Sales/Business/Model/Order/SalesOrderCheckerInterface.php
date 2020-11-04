<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

interface SalesOrderCheckerInterface
{
    /**
     * @param int $idSalesShipment
     * @param string $requiredShipmentMethodKey
     *
     * @return bool
     */
    public function checkOrderShipment(int $idSalesShipment, string $requiredShipmentMethodKey): bool;
}
