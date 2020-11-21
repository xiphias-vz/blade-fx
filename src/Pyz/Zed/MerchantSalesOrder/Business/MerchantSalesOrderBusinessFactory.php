<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Business;

use Pyz\Zed\MerchantSalesOrder\Business\Expander\SalesOrderExpander;
use Spryker\Zed\MerchantSalesOrder\Business\MerchantSalesOrderBusinessFactory as SprykerMerchantSalesOrderBusinessFactory;

/**
 * @method \Pyz\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface getRepository()
 */
class MerchantSalesOrderBusinessFactory extends SprykerMerchantSalesOrderBusinessFactory
{
    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\Expander\SalesOrderExpander
     */
    public function createSalesOrderExpander(): SalesOrderExpander
    {
        return new SalesOrderExpander(
            $this->getRepository()
        );
    }
}