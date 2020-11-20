<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder;

class PickingSalesOrderMapper
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder $pyzPickingSalesOrderEntity
     *
     * @return \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder
     */
    public function mapPickingSalesOrderTransferToPickingSalesOrderEntity(
        PickingSalesOrderTransfer $pickingSalesOrderTransfer,
        PyzPickingSalesOrder $pyzPickingSalesOrderEntity
    ): PyzPickingSalesOrder {
        $pyzPickingSalesOrderEntity->setContainerCode($pickingSalesOrderTransfer->getContainerCode());
        $pyzPickingSalesOrderEntity->setShelfCode($pickingSalesOrderTransfer->getShelfCode());
        $pyzPickingSalesOrderEntity->setFkSalesOrder($pickingSalesOrderTransfer->getIdSalesOrder());

        return $pyzPickingSalesOrderEntity;
    }

    /**
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder $pyzPickingSalesOrderEntity
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer
     */
    public function mapPickingSalesOrderEntityToPickingSalesOrderTransfer(
        PyzPickingSalesOrder $pyzPickingSalesOrderEntity,
        PickingSalesOrderTransfer $pickingSalesOrderTransfer
    ): PickingSalesOrderTransfer {
        $pickingSalesOrderTransfer->fromArray($pyzPickingSalesOrderEntity->toArray(), true);
        $pickingSalesOrderTransfer->setIdSalesOrder($pyzPickingSalesOrderEntity->getFkSalesOrder());

        return $pickingSalesOrderTransfer;
    }
}
