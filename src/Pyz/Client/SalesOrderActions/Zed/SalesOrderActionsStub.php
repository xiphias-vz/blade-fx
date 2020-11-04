<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\SalesOrderActions\Zed;

use Generated\Shared\Transfer\CancelOrderRequestTransfer;
use Generated\Shared\Transfer\CancelOrderResponseTransfer;
use Spryker\Client\ZedRequest\Stub\ZedRequestStub;

class SalesOrderActionsStub extends ZedRequestStub implements SalesOrderActionsStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\CancelOrderRequestTransfer $cancelOrderRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CancelOrderResponseTransfer
     */
    public function cancelOrder(CancelOrderRequestTransfer $cancelOrderRequestTransfer): CancelOrderResponseTransfer
    {
        /** @var \Generated\Shared\Transfer\CancelOrderResponseTransfer $cancelOrderResponseTransfer */
        $cancelOrderResponseTransfer = $this->zedStub->call('/sales-order-actions/gateway/cancel-order', $cancelOrderRequestTransfer);

        return $cancelOrderResponseTransfer;
    }
}
