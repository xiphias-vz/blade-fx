<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Business\Customer;

use Pyz\Zed\Customer\Persistence\CustomerEntityManagerInterface;

class CustomerWriter implements CustomerWriterInterface
{
    /**
     * @var \Pyz\Zed\Customer\Persistence\CustomerEntityManagerInterface
     */
    protected $customerEntityManager;

    /**
     * @param \Pyz\Zed\Customer\Persistence\CustomerEntityManagerInterface $customerEntityManager
     */
    public function __construct(
        CustomerEntityManagerInterface $customerEntityManager
    ) {
        $this->customerEntityManager = $customerEntityManager;
    }

    /**
     * @param string $customerReference
     *
     * @return void
     */
    public function setCustomerHasOrderByCustomerReference(string $customerReference): void
    {
        $this->customerEntityManager->setCustomerHasOrderByCustomerReference($customerReference);
    }
}
