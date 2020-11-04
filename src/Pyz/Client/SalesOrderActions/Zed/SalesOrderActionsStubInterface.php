<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\SalesOrderActions\Zed;

use Generated\Shared\Transfer\CancelOrderRequestTransfer;
use Generated\Shared\Transfer\CancelOrderResponseTransfer;

interface SalesOrderActionsStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\CancelOrderRequestTransfer $cancelOrderRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CancelOrderResponseTransfer
     */
    public function cancelOrder(CancelOrderRequestTransfer $cancelOrderRequestTransfer): CancelOrderResponseTransfer;
}
