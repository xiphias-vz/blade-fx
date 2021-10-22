<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail\Model;

use Generated\Shared\Transfer\OrderDetailRequestTransfer;

interface OrderDetailModelInterface
{
    /**
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getOrderDetailData(int $idSalesOrder, int $idCustomer): array;

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    public function getInvoiceOrderDetailDataByOrder(OrderDetailRequestTransfer $orderDetailRequestTransfer): array;

    /**
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getInvoiceOrderDetailData(int $idSalesOrder, int $idCustomer): array;
}
