<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Communication\Plugin\Oms\Command;

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
class SendInvoiceCommandByOrderPlugin extends AbstractPlugin implements CommandByOrderInterface
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
        Propel::disableInstancePooling();

        $this->getFacade()
            ->sendInvoiceEmail($orderEntity->getIdSalesOrder());

        Propel::enableInstancePooling();

        return [];
    }
}
