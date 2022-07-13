<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria as SprykerCriteria;
use Spryker\Zed\Sales\Persistence\SalesQueryContainer as SprykerSalesQueryContainer;

/**
 * @method \Pyz\Zed\Sales\Persistence\SalesPersistenceFactory getFactory()
 */
class SalesQueryContainer extends SprykerSalesQueryContainer implements SalesQueryContainerInterface
{
    /**
     * Order item state history is joined as a part of temp UI optimization and
     * should be reduced in high-load environment.
     *
     * @uses \Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistory
     * @uses \Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistoryQuery
     *
     * @api
     *
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function querySalesOrderDetails($idSalesOrder): SpySalesOrderQuery
    {
        $query = $this->getFactory()->createSalesOrderQuery()
            ->setModelAlias('order')
            ->filterByIdSalesOrder($idSalesOrder)
            ->innerJoinWith('order.BillingAddress billingAddress')
            ->innerJoinWith('billingAddress.Country billingCountry')
            ->innerJoinWith('order.ShippingAddress shippingAddress')
            ->innerJoinWith('shippingAddress.Country shippingCountry')
            ->joinWithItem()
                ->useItemQuery()
                    ->leftJoinWithStateHistory()
                    ->useStateHistoryQuery(null, Criteria::LEFT_JOIN)
                        ->leftJoinWithState()
                        ->orderByIdOmsOrderItemStateHistory(Criteria::DESC)
                    ->endUse()
                ->endUse();

        return $query;
    }

    /**
     * @api
     *
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function querySalesOrderDetailsWithoutShippingAddress($idSalesOrder): SpySalesOrderQuery
    {
        $query = $this->getFactory()->createSalesOrderQuery()
            ->setModelAlias('order')
            ->filterByIdSalesOrder($idSalesOrder)
            ->innerJoinWith('order.BillingAddress billingAddress')
            ->innerJoinWith('billingAddress.Country billingCountry')
            ->leftJoinWith('order.ShippingAddress shippingAddress')
            ->leftJoinWith('shippingAddress.Country shippingCountry')
            ->joinWithItem()
                ->useItemQuery()
                    ->leftJoinWithStateHistory()
                    ->useStateHistoryQuery(null, Criteria::LEFT_JOIN)
                        ->leftJoinWithState()
                        ->orderByIdOmsOrderItemStateHistory(Criteria::DESC)
                    ->endUse()
                ->endUse();

        return $query;
    }

    /**
     * @api
     *
     * @param int $idSalesOrder
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function querySalesOrderDetailsWithPickingSalesOrder(int $idSalesOrder): SpySalesOrderQuery
    {
        $query = $this->getFactory()->createSalesOrderQuery()
            ->setModelAlias('order')
            ->filterByIdSalesOrder($idSalesOrder)
            ->leftJoinWithPyzPickingSalesOrder()
            ->innerJoinWith('order.BillingAddress billingAddress')
            ->innerJoinWith('billingAddress.Country billingCountry')
            ->leftJoinWith('order.ShippingAddress shippingAddress')
            ->leftJoinWith('shippingAddress.Country shippingCountry')
            ->joinWithItem()
                ->useItemQuery()
                    ->leftJoinWithStateHistory()
                    ->useStateHistoryQuery(null, Criteria::LEFT_JOIN)
                        ->leftJoinWithState()
                        ->orderByIdOmsOrderItemStateHistory(Criteria::DESC)
                ->endUse()
            ->endUse();

        return $query;
    }

    /**
     * @api
     *
     * @param int $idSalesOrder
     * @param array $itemIdRange
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function querySalesOrderDetailsWithPickingSalesOrderFilterByItemId(int $idSalesOrder, array $itemIdRange): SpySalesOrderQuery
    {
        $query = $this->getFactory()->createSalesOrderQuery()
            ->setModelAlias('order')
            ->filterByIdSalesOrder($idSalesOrder)
            ->leftJoinWithPyzPickingSalesOrder()
            ->innerJoinWith('order.BillingAddress billingAddress')
            ->innerJoinWith('billingAddress.Country billingCountry')
            ->leftJoinWith('order.ShippingAddress shippingAddress')
            ->leftJoinWith('shippingAddress.Country shippingCountry')
            ->joinWithItem()
                ->useItemQuery()
                    ->filterByIdSalesOrderItem($itemIdRange, SprykerCriteria::BETWEEN)
                    ->leftJoinWithStateHistory()
                    ->useStateHistoryQuery(null, Criteria::LEFT_JOIN)
                        ->leftJoinWithState()
                        ->orderByIdOmsOrderItemStateHistory(Criteria::DESC)
                ->endUse()
            ->endUse();

        return $query;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return int
     */
    public function querySalesOrderItemCount(int $idSalesOrder): int
    {
        $query = $this->getFactory()->createSalesOrderQuery()
            ->setModelAlias('order')
            ->filterByIdSalesOrder($idSalesOrder)
            ->joinWithItem()
                ->useItemQuery()
                    ->count();

        return $query;
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderChangeQuery
     */
    public function querySalesOrderChange()
    {
        return $this->getFactory()
            ->createSalesOrderChangeQuery();
    }
}
