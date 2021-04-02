<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Business;

use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Spryker\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacade as SprykerMerchantSalesOrderFacade;

/**
 * @method \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderBusinessFactory getFactory()
 * @method \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface getRepository()
 */
class MerchantSalesOrderFacade extends SprykerMerchantSalesOrderFacade implements MerchantSalesOrderFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function findMerchantSalesOrdersByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): MerchantSalesOrderCollectionTransfer {
        return $this->getRepository()->findMerchantSalesOrdersByOrderFilterCriteria($orderFilterCriteriaTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
     *
     * @return mixed[]
     */
    public function getSalesOrderItemDataByPickingDateAndPickingZone(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): array {
        return $this->getRepository()->getSalesOrderItemDataByPickingDateAndPickingZone($orderFilterCriteriaTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
     *
     * @return mixed[]
     */
    public function getSalesOrderItemDataByPickingDateAndPickingZoneWithPauseStatus(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransfer
    ): array {
        return $this->getRepository()->getSalesOrderItemDataByPickingDateAndPickingZoneWithPauseStatus($orderFilterCriteriaTransfer);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderWithOrderUpdateRequest(
        int $idSalesOrder,
        OrderUpdateRequestTransfer $orderUpdateRequestTransfer
    ): bool {
        return $this->getEntityManager()
            ->updateOrderWithOrderUpdateRequest($idSalesOrder, $orderUpdateRequestTransfer);
    }

    /**
     * @inheritDoc
     */
    public function expandOrderWithMerchantSalesOrder(OrderTransfer $orderTransfer): OrderTransfer
    {
        return $this->getFactory()
            ->createSalesOrderExpander()
            ->expandOrderWithMerchantSalesOrder($orderTransfer);
    }
}
