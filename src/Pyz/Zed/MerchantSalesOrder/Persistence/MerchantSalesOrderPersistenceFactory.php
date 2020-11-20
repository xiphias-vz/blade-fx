<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use Pyz\Zed\MerchantSalesOrder\Persistence\Propel\Mapper\MerchantSalesOrderMapper;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderPersistenceFactory as SprykerMerchantSalesOrderPersistenceFactory;
use Spryker\Zed\MerchantSalesOrder\Persistence\Propel\Mapper\MerchantSalesOrderMapper as SprykerMerchantSalesOrderMapper;

class MerchantSalesOrderPersistenceFactory extends SprykerMerchantSalesOrderPersistenceFactory
{
    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Persistence\Propel\Mapper\MerchantSalesOrderMapper
     */
    public function createMerchantSalesOrderMapper(): SprykerMerchantSalesOrderMapper
    {
        return new MerchantSalesOrderMapper();
    }
}
