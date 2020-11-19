<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\OrderContainerTransfer;
use Orm\Zed\OrderContainer\Persistence\PyzOrderContainer;

class OrderContainerMapper
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerTransfer $OrderContainerTransfer
     * @param \Orm\Zed\OrderContainer\Persistence\PyzOrderContainer $pyzOrderContainerEntity
     *
     * @return \Orm\Zed\OrderContainer\Persistence\PyzOrderContainer
     */
    public function mapOrderContainerTransferToOrderContainerEntity(
        OrderContainerTransfer $OrderContainerTransfer,
        PyzOrderContainer $pyzOrderContainerEntity
    ): PyzOrderContainer {
        $pyzOrderContainerEntity->fromArray($OrderContainerTransfer->toArray());
        $pyzOrderContainerEntity->setFkSalesOrder($OrderContainerTransfer->getIdSalesOrder());

        return $pyzOrderContainerEntity;
    }
}
