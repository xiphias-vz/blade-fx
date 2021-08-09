<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use XMLWriter;

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
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function exportOrders(OrderTransfer $orderTransfer): OrderTransfer
    {
        return $this->getFactory()->createCashierOrderExporter()->exportOrders($orderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function writeTxt(OrderTransfer $orderTransfer): string
    {
        return $this->getFactory()->createCashierOrderContentBuilder()->prepareContent($orderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \XMLWriter
     */
    public function writeXml(OrderTransfer $orderTransfer): XMLWriter
    {
        return $this->getFactory()->createCashierOrderContentBuilder()->prepareContentXml($orderTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @param int $orderId
     *
     * @return bool
     */
    public function checkIsOrderExportedToCashierSuccessfully(int $orderId): bool
    {
        return $this->getFactory()->createCashierOrderExportStatusChecker()->isOrderExportedSuccessfully($orderId);
    }

    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function checkIsAllItemsReadyForExport(OrderTransfer $orderTransfer): bool
    {
        return $this->getFactory()->createCashierOrderExportReadinessChecker()->checkIsAllItemsReadyForExport($orderTransfer);
    }
}
