<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderPersistenceFactory getFactory()
 */
interface PickingSalesOrderRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getPickingSalesOrderCollection(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): PickingSalesOrderCollectionTransfer;
}
