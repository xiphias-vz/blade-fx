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
     * @return void
     */
    public function create(PickingSalesOrderTransfer $pickingSalesOrderTransfer): void;

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     */
    public function delete(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): void;
}
