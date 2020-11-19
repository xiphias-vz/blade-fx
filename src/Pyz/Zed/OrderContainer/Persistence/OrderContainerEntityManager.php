<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Persistence;

use Generated\Shared\Transfer\OrderContainerTransfer;
use Orm\Zed\OrderContainer\Persistence\PyzOrderContainer;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\OrderContainer\Persistence\OrderContainerPersistenceFactory getFactory()
 */
class OrderContainerEntityManager extends AbstractEntityManager implements OrderContainerEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
     *
     * @return void
     */
    public function create(OrderContainerTransfer $orderContainerTransfer): void
    {
        $orderContainerEntity = $this->getFactory()
            ->createOrderContainerMapper()
            ->mapOrderContainerTransferToOrderContainerEntity($orderContainerTransfer, new PyzOrderContainer());

        $orderContainerEntity->save();
    }
}
