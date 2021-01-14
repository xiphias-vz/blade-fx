<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use StoreApp\Zed\Picker\Business\PickerBusinessFactory;

class ContainerReader implements ContainerReaderInterface
{
    /**
     * @var \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     */
    protected $pyzPickingSalesOrderQuery;

    /**
     * @var \Spryker\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    protected $salesFacade;

    /**
     * @var \StoreApp\Zed\Picker\Business\PickerBusinessFactory $factory
     */
    protected $factory;

    /**
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     * @param \Spryker\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \StoreApp\Zed\Picker\Business\PickerBusinessFactory $factory
     */
    public function __construct(
        PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery,
        SalesFacadeInterface $salesFacade,
        PickerBusinessFactory $factory
    ) {
        $this->pyzPickingSalesOrderQuery = $pyzPickingSalesOrderQuery;
        $this->salesFacade = $salesFacade;
        $this->factory = $factory;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getContainerCodes(
        PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
    ): PickingSalesOrderCollectionTransfer {
        $pickingSalesOrderCollectionTransfer = (new PickingSalesOrderCollectionTransfer());

        if (!empty($pickingSalesOrderCriteriaTransfer->getContainerCodes())) {
            $pickingSalesOrderQuery = $this->pyzPickingSalesOrderQuery->filterByContainerCode_In($pickingSalesOrderCriteriaTransfer->getContainerCodes());
            $pyzPickingSalesOrderEntityCollection = $pickingSalesOrderQuery->find();

            foreach ($pyzPickingSalesOrderEntityCollection as $pyzPickingSalesOrderEntity) {
                $pickingSalesOrderTransfer = $this->factory
                    ->createPickingSalesOrderMapper()
                    ->mapPickingSalesOrderEntityToPickingSalesOrderTransfer($pyzPickingSalesOrderEntity, new PickingSalesOrderTransfer());

                $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
            }
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param string $ContainerId
     * @param string $orderId
     *
     * @return bool
     */
    public function checkContainerUse(string $ContainerId, string $orderId): bool
    {
        $pickingContainerOrders = $this->pyzPickingSalesOrderQuery->findByContainerCode($ContainerId);
        foreach ($pickingContainerOrders->toArray() as $order) {
            if ($order['FkSalesOrder'] != $orderId) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param string $orderId
     *
     * @return array
     */
    public function getContainersByOrderId(string $orderId): array
    {
        $pickingSalesOrderCollectionTransfer = (new PickingSalesOrderCollectionTransfer());
        $pickingSalesOrders = $this->pyzPickingSalesOrderQuery->findByFkSalesOrder($orderId)->getData();

        foreach ($pickingSalesOrders as $pyzPickingSalesOrderEntity) {
            $pickingSalesOrderTransfer = $this->factory
                ->createPickingSalesOrderMapper()
                ->mapPickingSalesOrderEntityToPickingSalesOrderTransfer($pyzPickingSalesOrderEntity, new PickingSalesOrderTransfer());

            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer->toArray();
    }

    /**
     * @param string $ContainerId
     *
     * @return array (IdPickingSalesOrder, FkSalesOrder, FkPickingZone, ContainerCode, ShelfCode)
     */
    public function getContainerShelfs(string $ContainerId): array
    {
        return $this->pyzPickingSalesOrderQuery->findByContainerCode($ContainerId)->toArray();
    }
}
