<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderActions\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\SalesOrderActions\Business\SalesOrderActionsBusinessFactory getFactory()
 */
class SalesOrderActionsFacade extends AbstractFacade implements SalesOrderActionsFacadeInterface
{
    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return bool
     */
    public function cancelOrderByCustomer(string $customerReference, int $idSalesOrder): bool
    {
        return $this->getFactory()
            ->createSalesOrderActionsExecutor()
            ->cancelOrderByCustomer($customerReference, $idSalesOrder);
    }
}
