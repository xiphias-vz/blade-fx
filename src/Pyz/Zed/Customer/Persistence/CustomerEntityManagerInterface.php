<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Persistence;

use Spryker\Zed\Customer\Persistence\CustomerEntityManagerInterface as SprykerCustomerEntityManagerInterface;

interface CustomerEntityManagerInterface extends SprykerCustomerEntityManagerInterface
{
    /**
     * @param string $customerReference
     *
     * @return void
     */
    public function setCustomerHasOrderByCustomerReference(string $customerReference): void;
}
