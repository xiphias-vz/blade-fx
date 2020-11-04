<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Communication\Plugin\Sales;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface;

/**
 * @method \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantSalesOrder\Communication\MerchantSalesOrderCommunicationFactory getFactory()
 */
class MerchantSalesOrderExpanderPlugin extends AbstractPlugin implements OrderExpanderPluginInterface
{
    /**
     * @inheritDoc
     */
    public function hydrate(OrderTransfer $orderTransfer)
    {
        return $this->getFacade()
            ->expandOrderWithMerchantSalesOrder($orderTransfer);
    }
}
