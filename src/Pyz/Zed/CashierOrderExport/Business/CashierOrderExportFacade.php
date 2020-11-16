<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportBusinessFactory getFactory()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface getRepository()
 */
class CashierOrderExportFacade extends AbstractFacade implements CashierOrderExportFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function exportOrders(OrderTransfer $orderTransfer): void
    {
        $this->getFactory()->createCashierOrderExporter()->exportOrders($orderTransfer);
    }
}
