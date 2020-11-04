<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail;

use Generated\Shared\Transfer\OrderDetailRequestTransfer;

interface OrderDetailClientInterface
{
    /**
     * Specification:
     * - build order details data from DB.
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getOrderDetailData(int $idSalesOrder, int $idCustomer): array;

    /**
     * Specification:
     * - build invoice order details data from DB.
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getInvoiceOrderDetailData(int $idSalesOrder, int $idCustomer): array;

    /**
     * Specification:
     * - build invoice order details data from OrderDetailRequestTransfer.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    public function getInvoiceOrderDetailDataFromOrder(OrderDetailRequestTransfer $orderDetailRequestTransfer): array;
}
