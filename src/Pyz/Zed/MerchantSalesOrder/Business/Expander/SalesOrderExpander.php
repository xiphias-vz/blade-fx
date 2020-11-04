<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Business\Expander;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface;

class SalesOrderExpander
{
    /**
     * @var \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface
     */
    private $repository;

    /**
     * @param \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface $repository
     */
    public function __construct(MerchantSalesOrderRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expandOrderWithMerchantSalesOrder(OrderTransfer $orderTransfer): OrderTransfer
    {
        $merchantSalesOrderCollectionTransfer = $this->repository->findMerchantSalesOrdersByOrderFilterCriteria(
            (new OrderCriteriaFilterTransfer())->setIdSalesOrders([ $orderTransfer->getIdSalesOrder()])
        );

        if ($merchantSalesOrderCollectionTransfer->getMerchantSalesOrders()->count()) {
            $orderTransfer->setMerchantSalesOrder(
                $merchantSalesOrderCollectionTransfer->getMerchantSalesOrders()->getIterator()->current()
            );
        }

        return $orderTransfer;
    }
}
