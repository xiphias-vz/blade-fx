<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\PayoneCaptureTransfer;
use Generated\Shared\Transfer\PayonePaymentTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Payone\Communication\PayoneCommunicationFactory getFactory()
 * @method \Pyz\Zed\Payone\Business\PayoneFacadeInterface getFacade()
 * @method \Pyz\Zed\Payone\PayoneConfig getConfig()
 */
class CancelCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * {@inheritDoc}
     * - Performs capture call with amount 0, cancels order.
     *
     * @api
     *
     * @param array $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
        $orderTransfer = $this->getFactory()
            ->getSalesFacade()
            ->getOrderByIdSalesOrder($orderEntity->getIdSalesOrder());

        $captureTransfer = (new PayoneCaptureTransfer())
            ->setAmount(0)
            ->setOrder($orderTransfer)
            ->setPayment(
                (new PayonePaymentTransfer())->setFkSalesOrder($orderEntity->getIdSalesOrder())
            );

        $this->getFacade()->capturePayment($captureTransfer);

        return [];
    }
}
