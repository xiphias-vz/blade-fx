<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business\Writer;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface;
use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class PickingSalesOrderWriter implements PickingSalesOrderWriterInterface
{
    use TransactionTrait;

    /**
     * @var \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface
     */
    protected $pickingSalesOrderEntityManager;

    /**
     * @param \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface $pickingSalesOrderEntityManager
     */
    public function __construct(
        PickingSalesOrderEntityManagerInterface $pickingSalesOrderEntityManager
    ) {
        $this->pickingSalesOrderEntityManager = $pickingSalesOrderEntityManager;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function updatePickingSalesOrderOrder(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        $this->getTransactionHandler()->handleTransaction(function () use ($pickingSalesOrderCollectionTransfer) {
            $this->executeUpdateTransaction($pickingSalesOrderCollectionTransfer);
        });
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return void
     */
    protected function createPickingSalesOrder(PickingSalesOrderTransfer $pickingSalesOrderTransfer): void
    {
        $this->pickingSalesOrderEntityManager->create($pickingSalesOrderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    protected function executeUpdateTransaction(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        $containerCodes = [];
        foreach ($pickingSalesOrderCollectionTransfer->getPickingSalesOrders() as $pickingSalesOrderTransfer) {
            $containerCodes[] = $pickingSalesOrderTransfer->getContainerCode();
        }

        $pickingSalesOrderCriteriaTransfer = (new PickingSalesOrderCriteriaTransfer())
            ->setContainerCodes($containerCodes);

        $this->pickingSalesOrderEntityManager->delete($pickingSalesOrderCriteriaTransfer);

        $this->executeCreateTransaction($pickingSalesOrderCollectionTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    protected function executeCreateTransaction(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        foreach ($pickingSalesOrderCollectionTransfer->getPickingSalesOrders() as $pickingSalesOrderTransfer) {
            $this->createPickingSalesOrder($pickingSalesOrderTransfer);
        }
    }
}
