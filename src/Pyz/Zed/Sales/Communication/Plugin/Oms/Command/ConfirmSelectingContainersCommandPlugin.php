<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 */
class ConfirmSelectingContainersCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        $currentDateTimeInStoreTimeZone = $this->getFactory()
            ->getDateTimeWithZoneService()
            ->getDateTimeInStoreTimeZone('now');

        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setStoreStatus(OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES)
            ->setFkUser(null)
            ->setPickedAt($currentDateTimeInStoreTimeZone);

        $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $orderEntity->getIdSalesOrder(),
            $orderUpdateRequestTransfer
        );

        return [];
    }
}
