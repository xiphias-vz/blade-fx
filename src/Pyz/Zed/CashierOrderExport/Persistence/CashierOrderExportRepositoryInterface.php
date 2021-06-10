<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Persistence;

use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Product\Persistence\SpyProduct;

interface CashierOrderExportRepositoryInterface
{
    /**
     * @param string $productConcreteSku
     *
     * @return \Orm\Zed\Product\Persistence\SpyProduct
     */
    public function getProductBySku($productConcreteSku): SpyProduct;

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByMerchantReference(string $merchantReference): ?MerchantTransfer;
}
