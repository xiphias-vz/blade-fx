<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Plugin\Oms\Command;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Pyz\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Pyz\Zed\Customer\CustomerConfig getConfig()
 * @method \Pyz\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 */
class CustomerHasOrderWriterCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * {@inheritDoc}
     * - Finds customer by customer reference.
     * - Sets `hasOrders` flag for the found customer to true.
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
        if ($orderEntity->getCustomerReference() !== null) {
            $this->getFacade()->setCustomerHasOrderByCustomerReference($orderEntity->getCustomerReference());
        }

        return [];
    }
}
