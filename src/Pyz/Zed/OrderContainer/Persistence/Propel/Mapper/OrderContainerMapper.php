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
//    /**
//     * @param \Orm\Zed\OrderContainer\Persistence\PyzOrderContainer $orderContainerEntity
//     * @param \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
//     *
//     * @return \Generated\Shared\Transfer\OrderContainerTransfer
//     */
//    public function mapOrderContainerEntityToOrderContainerTransfer(
//        PyzOrderContainer $pyzOrderContainerEntity,
//        OrderContainerTransfer $orderContainerTransfer
//    ): OrderContainerTransfer {
//        $orderContainerTransfer->fromArray($pyzOrderContainerEntity->toArray(), true);
//
////        $merchantEntity = $merchantCountryProductEntity->getSpyMerchant();
////        if ($merchantEntity) {
////            $merchantTransfer = $merchantCountryProductTransfer->getMerchant() ?: new MerchantTransfer();
////            $merchantTransfer->fromArray($merchantEntity->toArray(), true);
////            $merchantCountryProductTransfer->setMerchant($merchantTransfer);
////        }
////
////        $countryEntity = $merchantCountryProductEntity->getSpyCountry();
////        if ($countryEntity) {
////            $countryTransfer = $merchantCountryProductTransfer->getCountry() ?: new CountryTransfer();
////            $countryTransfer->fromArray($countryEntity->toArray(), true);
////            $merchantCountryProductTransfer->setCountry($countryTransfer);
////        }
////
////        $productAbstractEntity = $merchantCountryProductEntity->getSpyProductAbstract();
////        if ($productAbstractEntity) {
////            $productAbstractTransfer = $merchantCountryProductTransfer->getProductAbstract() ?: new ProductAbstractTransfer();
////            $productAbstractTransfer->fromArray($productAbstractEntity->toArray(), true);
////            $merchantCountryProductTransfer->setProductAbstract($productAbstractTransfer);
////        }
//
//        return $orderContainerTransfer->setIdSalesOrder($orderContainerEntity->getFkSalesOrder()
//            ->setCountryId($merchantCountryProductEntity->getFkCountry())
//            ->setProductAbstractId($merchantCountryProductEntity->getFkProductAbstract())
//            ->setMerchantCountryProductAbstractId($merchantCountryProductEntity->getIdMerchantCountryProduct());
//    }

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
