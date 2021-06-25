<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Customer;

use ArrayObject;
use Generated\Shared\Transfer\OrderListTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydratorInterface;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Zed\Sales\Business\Model\Customer\PaginatedCustomerOrderOverview as SprykerPaginatedCustomerOrderOverview;
use Spryker\Zed\Sales\Business\Model\Order\CustomerOrderOverviewHydratorInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToOmsInterface;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface;

class PaginatedCustomerOrderOverview extends SprykerPaginatedCustomerOrderOverview
{
    protected const COL_ITEM_STATE_NAMES = 'COL_ITEM_STATE_NAMES';
    protected const REQUESTED_DATE_FORMAT = 'M. d';

    /**
     * @var \Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydratorInterface
     */
    protected $orderStatusHydrator;

    /**
     * @var \Pyz\Zed\Sales\SalesConfig
     */
    protected $salesConfig;

    /**
     * @param \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\Sales\Business\Model\Order\CustomerOrderOverviewHydratorInterface $customerOrderOverviewHydrator
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToOmsInterface $omsFacade
     * @param array $searchOrderExpanderPlugins
     * @param \Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydratorInterface $orderStatusHydrator
     * @param \Pyz\Zed\Sales\SalesConfig $salesConfig
     */
    public function __construct(
        SalesQueryContainerInterface $queryContainer,
        CustomerOrderOverviewHydratorInterface $customerOrderOverviewHydrator,
        SalesToOmsInterface $omsFacade,
        array $searchOrderExpanderPlugins,
        OrderStatusHydratorInterface $orderStatusHydrator,
        SalesConfig $salesConfig
    ) {
        parent::__construct($queryContainer, $customerOrderOverviewHydrator, $omsFacade, $searchOrderExpanderPlugins);
        $this->orderStatusHydrator = $orderStatusHydrator;
        $this->salesConfig = $salesConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderListTransfer $orderListTransfer
     * @param int $idCustomer
     *
     * @return \Generated\Shared\Transfer\OrderListTransfer
     */
    public function getOrdersOverview(OrderListTransfer $orderListTransfer, $idCustomer): OrderListTransfer
    {
        $ordersQuery = $this->queryContainer->queryCustomerOrders($idCustomer, $orderListTransfer->getFilter());
        $ordersQuery->addItemStateNameAggregationToResult(static::COL_ITEM_STATE_NAMES);
        $this->addDeliveryTimeToResult($ordersQuery);

        if (!$ordersQuery->getOrderByColumns()) {
            $ordersQuery->addDescendingOrderByColumn(SpySalesOrderTableMap::COL_CREATED_AT);
        }

        $orderListTransfer = $this->getOrderList($orderListTransfer, $ordersQuery);
        $orderListTransfer = $this->hydrateOrderStatus($orderListTransfer);

        return $orderListTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderListTransfer $orderListTransfer
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $ordersQuery
     *
     * @return \Generated\Shared\Transfer\OrderListTransfer
     */
    protected function getOrderList(
        OrderListTransfer $orderListTransfer,
        SpySalesOrderQuery $ordersQuery
    ): OrderListTransfer {
        $orderCollection = $this->getOrderCollection($orderListTransfer, $ordersQuery);
        $orders = new ArrayObject();

        foreach ($orderCollection as $salesOrderEntity) {
            if ($salesOrderEntity->countItems() === 0) {
                continue;
            }

            if ($this->excludeOrder($salesOrderEntity)) {
                continue;
            }

            $orderTransfer = $this->customerOrderOverviewHydrator->hydrateOrderTransfer($salesOrderEntity);
            $this->hydrateOrderState($salesOrderEntity, $orderTransfer);
            $this->hydrateRequestedDeliveryDate($salesOrderEntity, $orderTransfer);
            $orders->append($orderTransfer);
        }

        return $orderListTransfer->setOrders($orders);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderListTransfer $orderListTransfer
     *
     * @return \Generated\Shared\Transfer\OrderListTransfer
     */
    protected function hydrateOrderStatus(OrderListTransfer $orderListTransfer): OrderListTransfer
    {
        foreach ($orderListTransfer->getOrders() as $orderTransfer) {
            $this->orderStatusHydrator->hydrateOrderStatus($orderTransfer);
        }

        return $orderListTransfer;
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

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $ordersQuery
     *
     * @return void
     */
    private function addDeliveryTimeToResult(SpySalesOrderQuery $ordersQuery): void
    {
        $ordersQuery
            ->useSpySalesShipmentQuery(null, Criteria::LEFT_JOIN)
                ->withColumn(SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE, OrderTransfer::REQUESTED_DELIVERY_DATE)
            ->endUse();
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    protected function hydrateOrderState(SpySalesOrder $salesOrderEntity, OrderTransfer $orderTransfer): void
    {
        $orderState = $this->groupItemStateNames($salesOrderEntity->getVirtualColumn(static::COL_ITEM_STATE_NAMES));
        $orderState = $this->salesConfig->getOrderStateByStateMap($orderState);
        $orderTransfer->setStatus($orderState);
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    private function hydrateRequestedDeliveryDate(SpySalesOrder $salesOrderEntity, OrderTransfer $orderTransfer): void
    {
        $requestedDelivery = $orderTransfer->getRequestedDeliveryDate();
        if (!$requestedDelivery || strpos($requestedDelivery, '_') === false) {
            return;
        }

        [$date, $timeSlot] = explode('_', $requestedDelivery);
        $formattedDate = date(static::REQUESTED_DATE_FORMAT, strtotime($date));
        $orderTransfer->setRequestedDeliveryDate($formattedDate . ', ' . $timeSlot);
    }
}
