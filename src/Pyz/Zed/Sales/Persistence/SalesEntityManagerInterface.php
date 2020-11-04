<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use DateTime;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Spryker\Zed\Sales\Persistence\SalesEntityManagerInterface as SprykerSalesEntityManagerInterface;

/**
 * @method \Spryker\Zed\Sales\Persistence\SalesPersistenceFactory getFactory()
 */
interface SalesEntityManagerInterface extends SprykerSalesEntityManagerInterface
{
    /**
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return bool
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): bool;

    /**
     * @param int $idSalesOrder
     * @param string $status
     *
     * @return bool
     */
    public function updateOrderStoreStatus(int $idSalesOrder, string $status): bool;

    /**
     * @param int $idSalesOrder
     * @param string $invoiceReference
     * @param \DateTime $invoiceDateTime
     *
     * @return void
     */
    public function saveInvoiceReference(int $idSalesOrder, string $invoiceReference, DateTime $invoiceDateTime): void;

    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return bool
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool;
}
