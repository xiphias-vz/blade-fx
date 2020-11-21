<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Persistence;

use Spryker\Zed\Customer\Persistence\CustomerEntityManager as SprykerCustomerEntityManager;

/**
 * @method \Spryker\Zed\Customer\Persistence\CustomerPersistenceFactory getFactory()
 */
class CustomerEntityManager extends SprykerCustomerEntityManager implements CustomerEntityManagerInterface
{
    /**
     * @param string $customerReference
     *
     * @return void
     */
    public function setCustomerHasOrderByCustomerReference(string $customerReference): void
    {
        $customerEntity = $this->getFactory()
            ->createSpyCustomerQuery()
            ->filterByCustomerReference($customerReference)
            ->findOne();

        $customerEntity->setHasOrders(true)->save();
    }
}
