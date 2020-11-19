<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Business;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\OrderContainer\Business\OrderContainerBusinessFactory getFactory()
 * @method \Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface getEntityManager()
 */
class OrderContainerFacade extends AbstractFacade implements OrderContainerFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void
    {
        $this->getFactory()->createOrderContainerWriter()->createOrderContainers($orderContainerCollectionTransfer);
    }
}
