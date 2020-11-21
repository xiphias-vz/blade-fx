<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence;

use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;

interface PickingSalesOrderEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer
     */
    public function create(PickingSalesOrderTransfer $pickingSalesOrderTransfer): PickingSalesOrderTransfer;

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer
     */
    public function update(PickingSalesOrderTransfer $pickingSalesOrderTransfer): PickingSalesOrderTransfer;

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return void
     */
    public function delete(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): void;
}
