<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Communication\Plugin\Oms\Command;

use DateTime;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Invoice\Business\InvoiceFacadeInterface getFacade()
 * @method \Pyz\Zed\Invoice\InvoiceConfig getConfig()
 * @method \Pyz\Zed\Invoice\Communication\InvoiceCommunicationFactory getFactory()
 */
class GenerateInvoiceReferenceCommandByOrderPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @inheritDoc
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        Propel::disableInstancePooling();

        if ($orderEntity->getInvoiceReference()) {
            return [];
        }

        $deliveryDate = $this->getDeliveryDateTime($orderItems);

        $this->getFacade()
            ->generateInvoiceReference(
                $orderEntity->getIdSalesOrder(),
                $deliveryDate
            );

        Propel::enableInstancePooling();

        return [];
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return \DateTime
     */
    protected function getDeliveryDateTime(array $orderItems): DateTime
    {
        $stateHistory = $orderItems[0]->getStateHistories();

        return $stateHistory[$stateHistory->count() - 2]->getCreatedAt();
    }
}
