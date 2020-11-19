<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerBusinessFactory getFactory()
 */
class PickerFacade extends AbstractFacade implements PickerFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function markOrderItemsAsPicked(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsPicked($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsNotPicked(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsNotPicked($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCollectedByCustomer(array $idSalesOrderItems, int $idUser): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsCollectedByCustomer($idSalesOrderItems, $idUser);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): void
    {
        $this->getFactory()->createOrderUpdater()
            ->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCanceledByCustomer(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsCanceledByCustomer($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void
    {
        $this->getFactory()->createOrderContainersCreator()->createOrderContainers($orderContainerCollectionTransfer);
    }
}
