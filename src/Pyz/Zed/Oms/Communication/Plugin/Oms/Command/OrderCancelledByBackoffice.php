<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Pyz\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Oms\OmsConfig getConfig()
 * @method \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 */
class OrderCancelledByBackoffice extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @param array $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setStoreStatus(OmsConfig::STATE_CANCELLED_BY_BACKOFFICE);

        $idSalesOrder = $orderEntity->getIdSalesOrder();

        $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $idSalesOrder,
            $orderUpdateRequestTransfer
        );

        return [];
    }
}
