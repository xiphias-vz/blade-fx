<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Generated\Shared\Transfer\OrderTransfer;

interface OrderStatusHydratorInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateOrderStatus(OrderTransfer $orderTransfer): OrderTransfer;
}
