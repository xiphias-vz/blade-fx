<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\StoreOrder\Business;

use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \StoreApp\Zed\StoreOrder\Business\StoreOrderBusinessFactory getFactory()
 */
class StoreOrderFacade extends AbstractFacade implements StoreOrderFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        return $this->getFactory()->createStoreOrderReader()
            ->findDeliveryMerchantSalesOrders($userTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findSelectedDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        return $this->getFactory()->createStoreOrderReader()
            ->findSelectedDeliveryMerchantSalesOrders($userTransfer);
    }
}