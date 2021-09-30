<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Order;

use Generated\Shared\Transfer\ItemStateTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistory;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Zed\Sales\Business\Exception\InvalidSalesOrderException;
use Spryker\Zed\Sales\Business\Order\OrderHydrator as SprykerOrderHydrator;
use Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToOmsInterface;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface;

class OrderHydrator extends SprykerOrderHydrator implements OrderHydratorInterface
{
    protected const COL_ITEM_STATE_NAMES = 'COL_ITEM_STATE_NAMES';

    /**
     * @var \Pyz\Zed\Sales\SalesConfig
     */
    protected $salesConfig;

    /**
     * @param \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToOmsInterface $omsFacade
     * @param \Pyz\Zed\Sales\SalesConfig $salesConfig
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface $customerFacade
     * @param array $hydrateOrderPlugins
     */
    public function __construct(
        SalesQueryContainerInterface $queryContainer,
        SalesToOmsInterface $omsFacade,
        SalesConfig $salesConfig,
        SalesToCustomerInterface $customerFacade,
        array $hydrateOrderPlugins = [],
        array $orderItemExpanderPlugins = [],
        array $customerOrderAccessCheckPlugins = []
    ) {
        parent::__construct(
            $queryContainer,
            $omsFacade,
            $salesConfig,
            $customerFacade,
            $hydrateOrderPlugins,
            $orderItemExpanderPlugins,
            $customerOrderAccessCheckPlugins
        );

        $this->salesConfig = $salesConfig;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function hydrateOrderItemsToOrderTransfer(SpySalesOrder $orderEntity, OrderTransfer $orderTransfer)
    {
        $itemTransfers = [];

        foreach ($orderEntity->getItems() as $orderItemEntity) {
            $itemTransfers[] = $this->hydrateOrderItemTransfer($orderItemEntity);
        }

        $itemTransfers = $this->executeOrderItemExpanderPlugins($itemTransfers);
        $orderTransfer->setItems(new \ArrayObject($itemTransfers));
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @throws \Spryker\Zed\Sales\Business\Exception\InvalidSalesOrderException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrder
     */
    protected function getOrderEntity(OrderTransfer $orderTransfer)
    {
        $orderTransfer->requireIdSalesOrder()
            ->requireFkCustomer();

        $orderEntity = $this->queryContainer
            ->querySalesOrderDetailsWithoutShippingAddress($orderTransfer->getIdSalesOrder())
            ->filterByFkCustomer($orderTransfer->getFkCustomer())
            ->addItemStateNameAggregationToResult(static::COL_ITEM_STATE_NAMES)
            ->find()
            ->getFirst();

        if ($orderEntity === null) {
            throw new InvalidSalesOrderException(sprintf(
                'Order could not be found for ID %s and customer reference %s',
                $orderTransfer->getIdSalesOrder(),
                $orderTransfer->getCustomerReference()
            ));
        }

        return $orderEntity;
    }

    /**
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Sales\Business\Exception\InvalidSalesOrderException
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateOrderTransferFromPersistenceByIdSalesOrder($idSalesOrder)
    {
        $orderEntity = $this->queryContainer
            ->querySalesOrderDetailsWithoutShippingAddress($idSalesOrder)
            ->find()
            ->getFirst();

        if ($orderEntity === null) {
            throw new InvalidSalesOrderException(
                sprintf(
                    'Order could not be found for ID %s',
                    $idSalesOrder
                )
            );
        }

        return $this->hydrateOrderTransferFromPersistenceBySalesOrder($orderEntity);
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateOrderTransferFromPersistenceBySalesOrder(SpySalesOrder $orderEntity): OrderTransfer
    {
        return $this->createOrderTransfer($orderEntity);
    }

    /**
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Sales\Business\Exception\InvalidSalesOrderException
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function getOrderByIdSalesOrderWithoutExpand(int $idSalesOrder): OrderTransfer
    {
        $orderEntity = $this->queryContainer
            ->querySalesOrderDetailsWithoutShippingAddress($idSalesOrder)
            ->find()
            ->getFirst();

        if ($orderEntity === null) {
            throw new InvalidSalesOrderException(
                sprintf(
                    'Order could not be found for ID %s',
                    $idSalesOrder
                )
            );
        }

        $orderTransfer = $this->hydrateBaseOrderTransfer($orderEntity);
        $this->hydrateOrderItemsToOrderTransfer($orderEntity, $orderTransfer);

        return $orderTransfer;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItemEntity
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return void
     */
    protected function hydrateCurrentSalesOrderItemState(SpySalesOrderItem $orderItemEntity, ItemTransfer $itemTransfer)
    {
        $itemStateTransfer = new ItemStateTransfer();
        $itemStateTransfer->fromArray($orderItemEntity->getState()->toArray(), true);
        $itemStateTransfer->setIdSalesOrder($orderItemEntity->getIdSalesOrderItem());

        $lastStateHistory = $orderItemEntity->getStateHistories()->getFirst();
        if ($lastStateHistory instanceof SpyOmsOrderItemStateHistory) {
            $itemStateTransfer->setCreatedAt($lastStateHistory->getCreatedAt());
        }

        $itemTransfer->setState($itemStateTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function getCustomerOrder(OrderTransfer $orderTransfer)
    {
        $orderEntity = $this->getOrderEntity($orderTransfer);

        $orderTransfer = $this->createOrderTransfer($orderEntity);

        return $orderTransfer;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    protected function applyOrderTransferHydrators(SpySalesOrder $orderEntity)
    {
        $orderTransfer = parent::applyOrderTransferHydrators($orderEntity);
        $orderTransfer->setLocale((new LocaleTransfer())->fromArray($orderEntity->getLocale()->toArray()));
        $orderTransfer->setPickingSalesOrderCollection($this->getPickingSalesOrderCollection($orderEntity));

        if ($orderEntity->hasVirtualColumn(static::COL_ITEM_STATE_NAMES)) {
            $orderState = $this->groupItemStateNames($orderEntity->getVirtualColumn(static::COL_ITEM_STATE_NAMES));
            $orderState = $this->salesConfig->getOrderStateByStateMap($orderState);
            $orderTransfer->setStatus($orderState);
        }

        return $orderTransfer;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    protected function getPickingSalesOrderCollection(SpySalesOrder $orderEntity): PickingSalesOrderCollectionTransfer
    {
        $pickingSalesOrderCollection = new PickingSalesOrderCollectionTransfer();
        foreach ($orderEntity->getPyzPickingSalesOrders() as $pyzPickingSalesOrder) {
            $item = new PickingSalesOrderTransfer();
            $item->fromArray($pyzPickingSalesOrder->toArray(), true);
            $item->setIdPickingZone($pyzPickingSalesOrder->getFkPickingZone());
            $pickingSalesOrderCollection->addPickingSalesOrder($item);
        }

        return $pickingSalesOrderCollection;
    }

    /**
     * @param string $itemStateNamesCsv
     *
     * @return string
     */
    protected function groupItemStateNames(string $itemStateNamesCsv): string
    {
        $itemStateNames = explode(',', $itemStateNamesCsv);
        $itemStateNames = array_map('trim', $itemStateNames);
        $distinctItemStateNames = array_unique($itemStateNames);
        $distinctItemStateNamesCsv = implode(', ', $distinctItemStateNames);

        return $distinctItemStateNamesCsv;
    }
}
