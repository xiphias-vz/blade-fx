<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Zed\MerchantSalesOrder\Persistence\Propel\Mapper\MerchantSalesOrderMapper as SprykerMerchantSalesOrderMapper;

class MerchantSalesOrderMapper extends SprykerMerchantSalesOrderMapper
{
    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder[] $merchantSalesOrderEntities
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    public function mapMerchantSalesOrderEntitiesToCollectionTransfer(
        ObjectCollection $merchantSalesOrderEntities
    ): MerchantSalesOrderCollectionTransfer {
        $merchantSalesOrderCollectionTransfer = new MerchantSalesOrderCollectionTransfer();

        foreach ($merchantSalesOrderEntities as $merchantSalesOrderEntity) {
            $merchantSalesOrderTransfer = $this->mapMerchantSalesOrderEntityToMerchantSalesOrderTransfer(
                $merchantSalesOrderEntity,
                new MerchantSalesOrderTransfer()
            );

            $merchantSalesOrderTransfer = $this->setOrderPickingBlockUser(
                $merchantSalesOrderEntity,
                $merchantSalesOrderTransfer
            );

            $merchantSalesOrderCollectionTransfer->getMerchantSalesOrders()->offsetSet(
                $merchantSalesOrderEntity->getFkSalesOrder(),
                $merchantSalesOrderTransfer
            );
        }

        return $merchantSalesOrderCollectionTransfer;
    }

    /**
     * @param \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder $merchantSalesOrderEntity
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer
     */
    protected function setOrderPickingBlockUser(
        SpyMerchantSalesOrder $merchantSalesOrderEntity,
        MerchantSalesOrderTransfer $merchantSalesOrderTransfer
    ): MerchantSalesOrderTransfer {
        $virtualColumns = $merchantSalesOrderEntity->getVirtualColumns();

        if (!isset($virtualColumns[OrderPickingBlockTransfer::ID_USER])) {
            return $merchantSalesOrderTransfer;
        }

        $idUser = (int)$virtualColumns[OrderPickingBlockTransfer::ID_USER];

        return $merchantSalesOrderTransfer->setFkUser($idUser);
    }

    /**
     * @param \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder $merchantSalesOrderEntity
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer
     */
    public function mapMerchantSalesOrderEntityToMerchantSalesOrderTransfer(
        SpyMerchantSalesOrder $merchantSalesOrderEntity,
        MerchantSalesOrderTransfer $merchantSalesOrderTransfer
    ): MerchantSalesOrderTransfer {
        return $merchantSalesOrderTransfer->fromArray($merchantSalesOrderEntity->toArray(), true);
    }
}
