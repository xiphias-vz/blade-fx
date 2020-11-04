<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Business;

use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

/**
 * @method \Pyz\Zed\ProductUpdate\Business\ProductUpdateBusinessFactory getFactory()
 */
interface ProductUpdateFacadeInterface
{
    /**
     * @param string $productsCsvData
     *
     * @return array
     */
    public function updateProducts(string $productsCsvData): array;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $productData
     * @param string $priceType
     * @param string $priceField
     *
     * @return void
     */
    public function saveSinglePrice(DataSetInterface $productData, string $priceType, string $priceField): void;
}
