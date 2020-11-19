<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Business\Writer;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Generated\Shared\Transfer\OrderContainerTransfer;
use Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface;
use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class OrderContainerWriter implements OrderContainerWriterInterface
{
    use TransactionTrait;

    /**
     * @var \Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface
     */
    private $orderContainerEntityManager;

    /**
     * @param \Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface $orderContainerEntityManager
     */
    public function __construct(
        OrderContainerEntityManagerInterface $orderContainerEntityManager
    ) {
        $this->orderContainerEntityManager = $orderContainerEntityManager;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void
    {
        $this->getTransactionHandler()->handleTransaction(function () use ($orderContainerCollectionTransfer) {
            $this->executeCreateTransaction($orderContainerCollectionTransfer);
        });
    }

    /**
     * @param \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
     *
     * @return void
     */
    public function createOrderContainer(OrderContainerTransfer $orderContainerTransfer): void
    {
        $this->orderContainerEntityManager->create($orderContainerTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    protected function executeCreateTransaction(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void
    {
        foreach ($orderContainerCollectionTransfer->getOrderContainers() as $orderContainerTransfer) {
            $this->createOrderContainer($orderContainerTransfer);
        }
    }
}
