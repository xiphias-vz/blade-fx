<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;

interface PickingSalesOrderFacadeInterface
{
    /**
     * Specification:
     * - Creates PickingSalesOrders.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function updatePickingSalesOrderOrder(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void;

    /**
     * Specification:
     * - Updates PickingSalesOrder.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer
     */
    public function bindContainerToShelf(PickingSalesOrderTransfer $pickingSalesOrderTransfer): PickingSalesOrderTransfer;

    /**
     * Specification:
     * - Retrieves collection of PickingSalesOrder Transfer.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getPickingSalesOrderCollection(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): PickingSalesOrderCollectionTransfer;
}
