<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Communication;

use Pyz\Zed\CashierOrderExport\CashierOrderExportDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface getRepository()
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacadeInterface getFacade()()
 */
class CashierOrderExportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade()
    {
        return $this->getProvidedDependency(CashierOrderExportDependencyProvider::FACADE_SALES);
    }
}
