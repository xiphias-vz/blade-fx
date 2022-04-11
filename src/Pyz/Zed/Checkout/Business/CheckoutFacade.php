<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Business;

use Everon\Component\CriteriaBuilder\Criteria;
use Generated\Shared\Transfer\QuoteTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Propel\Runtime\ActiveQuery\Criteria as PropelCriteria;
use Spryker\Zed\Checkout\Business\CheckoutFacade as SprykerCheckoutFacade;
use Spryker\Zed\Checkout\Business\CheckoutFacadeInterface;

/**
 * @method \Pyz\Zed\Checkout\Business\CheckoutBusinessFactory getFactory()
 */
class CheckoutFacade extends SprykerCheckoutFacade implements CheckoutFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @throws \Exception
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function placeOrder(QuoteTransfer $quoteTransfer)
    {
        if ($quoteTransfer->getUuid() === null) {
            $quoteTransfer->setUuid(uniqid("", true));
        }
        if ($quoteTransfer->getUuid() != null) {
            $orderUuid = $this->getFactory()->getSalesOrderFacade()->getOrderByUid($quoteTransfer->getUuid());
        } else {
            $orderUuid = null;
        }
        if ($orderUuid == null) {
            $checkoutResponseTransfer = $this
                ->getFactory()
                ->createCheckoutWorkflow()
                ->placeOrder($quoteTransfer);
        } else {
            $checkoutResponseTransfer = $this
                ->getFactory()
                ->createCheckoutWorkflow()
                ->addCheckoutResponseTransfer($quoteTransfer, $orderUuid);
        }

        return $checkoutResponseTransfer;
    }

    /**
     * @param int $greaterThanIdOrder
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrder|null
     */
    public function getNewOrderEntity(int $greaterThanIdOrder): ?SpySalesOrder
    {
        return $this->getFactory()
            ->getSalesOrderOuery()
            ->filterByIdSalesOrder($greaterThanIdOrder, PropelCriteria::GREATER_THAN)
            ->findOneByIsNew(true);
    }

    /**
     * @param int $idOrder
     *
     * @return array
     */
    public function getOrderItemsIdList(int $idOrder): array
    {
        return $this->getFactory()
            ->getSalesOrderItemOuery()
            ->select([SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM])
            ->findByFkSalesOrder($idOrder)
            ->toArray();
    }

    /**
     * @return \Spryker\Zed\Checkout\Dependency\Facade\CheckoutToOmsFacadeInterface
     */
    public function getOmsFacade()
    {
        return $this->getFactory()->getOmsFacade();
    }
}
