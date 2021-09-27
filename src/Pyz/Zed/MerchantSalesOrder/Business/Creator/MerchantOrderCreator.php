<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Business\Creator;

use Generated\Shared\Transfer\MerchantOrderTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\MerchantSalesOrder\Business\Creator\MerchantOrderCreator as SprykerMerchantOrderCreator;

class MerchantOrderCreator extends SprykerMerchantOrderCreator
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantOrderTransfer
     */
    public function createMerchantOrder(OrderTransfer $orderTransfer, string $merchantReference): MerchantOrderTransfer
    {
        /** @var string $orderReference */
        $orderReference = $orderTransfer->getOrderReference();
        $merchantSalesOrderTransfer = $orderTransfer->getMerchantSalesOrder();

        $merchantOrderTransfer = (new MerchantOrderTransfer())
            ->setMerchantReference($merchantReference)
            ->setIdOrder($orderTransfer->getIdSalesOrder())
            ->setOrder($orderTransfer)
            ->setMerchantOrderReference(
                sprintf('%s--%s', $orderReference, $merchantReference)
            )
            ->setRequestedDeliveryDate($merchantSalesOrderTransfer->getRequestedDeliveryDate())
            ->setFkMerchant($merchantSalesOrderTransfer->getFkMerchant());

        return $this->merchantSalesOrderEntityManager->createMerchantOrder($merchantOrderTransfer);
    }
}
