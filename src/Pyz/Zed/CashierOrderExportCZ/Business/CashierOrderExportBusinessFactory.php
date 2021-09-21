<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExportCZ\Business;

use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface;
use Pyz\Zed\CashierOrderExport\Business\CashierOrderExportBusinessFactory as IntCashierOrderExportBusinessFactory;
use Pyz\Zed\CashierOrderExportCZ\Business\Builder\CashierOrderContentBuilder;

/**
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepository getRepository()
 */
class CashierOrderExportBusinessFactory extends IntCashierOrderExportBusinessFactory
{
    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilderInterface
     */
    public function createCashierOrderContentBuilder(): CashierOrderContentBuilderInterface
    {
        return new CashierOrderContentBuilder($this->getConfig(), $this->getRepository());
    }
}
