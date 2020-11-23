<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\OrderItem;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Pyz\Zed\Sales\Persistence\SalesRepositoryInterface;

class OrderItemExpander
{
    /**
     * @var \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface
     */
    protected $salesRepository;

    /**
     * @param \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface $salesRepository
     */
    public function __construct(SalesRepositoryInterface $salesRepository)
    {
        $this->salesRepository = $salesRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $itemEntityTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer
     */
    public function expandItemWithStockProductData(
        QuoteTransfer $quoteTransfer,
        SpySalesOrderItemEntityTransfer $itemEntityTransfer
    ): SpySalesOrderItemEntityTransfer {
        $stockProduct = $this->salesRepository->findStockProduct($quoteTransfer, $itemEntityTransfer);

        $itemEntityTransfer
            ->setSequence($stockProduct->getSequence())
            ->setShelf($stockProduct->getShelf())
            ->setShelfFloor($stockProduct->getShelfFloor())
            ->setShelfField($stockProduct->getShelfField());

        return $itemEntityTransfer;
    }
}
