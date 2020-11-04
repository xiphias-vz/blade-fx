<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderActions\Communication\Controller;

use Generated\Shared\Transfer\CancelOrderRequestTransfer;
use Generated\Shared\Transfer\CancelOrderResponseTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\SalesOrderActions\Business\SalesOrderActionsFacadeInterface getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @param \Generated\Shared\Transfer\CancelOrderRequestTransfer $cancelOrderRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CancelOrderResponseTransfer
     */
    public function cancelOrderAction(CancelOrderRequestTransfer $cancelOrderRequestTransfer): CancelOrderResponseTransfer
    {
        $isSuccess = $this->getFacade()->cancelOrderByCustomer(
            $cancelOrderRequestTransfer->getCustomerReference(),
            $cancelOrderRequestTransfer->getIdSalesOrder()
        );

        return (new CancelOrderResponseTransfer())
            ->setIsSuccess($isSuccess);
    }
}
