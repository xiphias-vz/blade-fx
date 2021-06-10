<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Persistence;

use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface getRepository()
 */
class CashierOrderExportPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function createMerchantQuery(): SpyMerchantQuery
    {
        return SpyMerchantQuery::create();
    }
}
