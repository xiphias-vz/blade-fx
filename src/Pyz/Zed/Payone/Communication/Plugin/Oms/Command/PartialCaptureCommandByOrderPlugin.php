<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\PayonePartialOperationRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Payone\Business\PayoneFacadeInterface getFacade()
 * @method \Pyz\Zed\Payone\Communication\PayoneCommunicationFactory getFactory()
 * @method \Pyz\Zed\Payone\PayoneConfig getConfig()
 */
class PartialCaptureCommandByOrderPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * {@inheritDoc}
     * - Performs partial capture call to Payone API.
     *
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
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

        $payonePartialOperationTransfer = (new PayonePartialOperationRequestTransfer())
            ->setOrder($orderTransfer);

        foreach ($orderItems as $orderItem) {
            $payonePartialOperationTransfer->addSalesOrderItemId($orderItem->getIdSalesOrderItem());
        }

        $this->getFacade()->executePartialCapture($payonePartialOperationTransfer);

        return [];
    }
}
