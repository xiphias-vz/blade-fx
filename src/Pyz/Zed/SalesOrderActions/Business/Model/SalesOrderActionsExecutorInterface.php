<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderActions\Business\Model;

interface SalesOrderActionsExecutorInterface
{
    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return bool
     */
    public function cancelOrderByCustomer(string $customerReference, int $idSalesOrder): bool;
}
