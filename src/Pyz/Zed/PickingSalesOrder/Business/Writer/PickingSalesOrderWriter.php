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
use Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface;
use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class PickingSalesOrderWriter implements PickingSalesOrderWriterInterface
{
    use TransactionTrait;

    /**
     * @var \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface
     */
    protected $pickingSalesOrderEntityManager;

    /**
     * @var \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface
     */
    protected $pickingSalesOrderRepository;

    /**
     * @param \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface $pickingSalesOrderEntityManager
     * @param \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface $pickingSalesOrderRepository
     */
    public function __construct(
        PickingSalesOrderEntityManagerInterface $pickingSalesOrderEntityManager,
        PickingSalesOrderRepositoryInterface $pickingSalesOrderRepository
    ) {
        $this->pickingSalesOrderEntityManager = $pickingSalesOrderEntityManager;
        $this->pickingSalesOrderRepository = $pickingSalesOrderRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function refreshPickingSalesOrderCollection(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        $this->getTransactionHandler()->handleTransaction(function () use ($pickingSalesOrderCollectionTransfer) {
            $this->executeRefreshTransaction($pickingSalesOrderCollectionTransfer);
        });
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer|null
     */
    public function bindContainerToShelf(PickingSalesOrderTransfer $pickingSalesOrderTransfer): ?PickingSalesOrderTransfer
    {
        $pickingSalesOrderCriteriaTransfer = (new PickingSalesOrderCriteriaTransfer())
            ->addContainerCode($pickingSalesOrderTransfer->getContainerCode());

        $pickingSalesOrders = $this->pickingSalesOrderRepository
            ->getPickingSalesOrderCollection($pickingSalesOrderCriteriaTransfer)
            ->getPickingSalesOrders();

        if (!$pickingSalesOrders->count()) {
            return null;
        }

        $pickingSalesOrderTransfer = $pickingSalesOrders->offsetGet(0)->setShelfCode($pickingSalesOrderTransfer->getShelfCode());

        return $this->pickingSalesOrderEntityManager->update($pickingSalesOrderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    protected function executeRefreshTransaction(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        $containerCodes = [];
        foreach ($pickingSalesOrderCollectionTransfer->getPickingSalesOrders() as $pickingSalesOrderTransfer) {
            $containerCodes[] = $pickingSalesOrderTransfer->getContainerCode();
        }

        $pickingSalesOrderCriteriaTransfer = (new PickingSalesOrderCriteriaTransfer())
            ->setContainerCodes($containerCodes);

        $this->pickingSalesOrderEntityManager->delete($pickingSalesOrderCriteriaTransfer);

        $this->createPickingSalesOrders($pickingSalesOrderCollectionTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    protected function createPickingSalesOrders(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        foreach ($pickingSalesOrderCollectionTransfer->getPickingSalesOrders() as $pickingSalesOrderTransfer) {
            $this->pickingSalesOrderEntityManager->create($pickingSalesOrderTransfer);
        }
    }
}
