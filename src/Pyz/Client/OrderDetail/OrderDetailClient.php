<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail;

use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\OrderDetail\OrderDetailFactory getFactory()
 */
class OrderDetailClient extends AbstractClient implements OrderDetailClientInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getOrderDetailData(int $idSalesOrder, int $idCustomer): array
    {
        return $this->getFactory()
            ->createOrderDetailModel()
            ->getOrderDetailData($idSalesOrder, $idCustomer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getInvoiceOrderDetailData(int $idSalesOrder, int $idCustomer): array
    {
        return $this->getFactory()
            ->createOrderDetailModel()
            ->getInvoiceOrderDetailData($idSalesOrder, $idCustomer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    public function getInvoiceOrderDetailDataFromOrder(OrderDetailRequestTransfer $orderDetailRequestTransfer): array
    {
        return $this->getFactory()
            ->createOrderDetailModel()
            ->getInvoiceOrderDetailDataByOrder($orderDetailRequestTransfer);
    }
}
