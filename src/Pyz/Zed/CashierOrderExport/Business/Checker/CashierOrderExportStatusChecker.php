<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

use Pyz\Zed\Sales\Business\SalesFacadeInterface;

class CashierOrderExportStatusChecker implements CashierOrderExportStatusCheckerInterface
{
    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    public function __construct(SalesFacadeInterface $salesFacade)
    {
        $this->salesFacade = $salesFacade;
    }

    /**
     * @param int $orderId
     *
     * @return bool
     */
    public function isOrderExportedSuccessfully(int $orderId): bool
    {
        $orderTransfer = $this->salesFacade->getOrderByIdSalesOrderWithoutExpand($orderId);

        return $orderTransfer->getIsCashierExportSuccess() ?? false;
    }
}
