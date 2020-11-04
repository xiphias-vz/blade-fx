<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface as SprykerMerchantSalesOrderRepositoryInterface;

interface MerchantSalesOrderRepositoryInterface extends SprykerMerchantSalesOrderRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    public function findMerchantSalesOrdersByOrderFilterCriteria(OrderCriteriaFilterTransfer $orderFilterCriteriaTransport): MerchantSalesOrderCollectionTransfer;
}
