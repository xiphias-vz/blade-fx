<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Business;

use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\ProductUpdate\Business\ProductUpdateBusinessFactory getFactory()
 * @method \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface getRepository()
 */
class ProductUpdateFacade extends AbstractFacade implements ProductUpdateFacadeInterface
{
    /**
     * @param string $productsCsvData
     *
     * @return array
     */
    public function updateProducts(string $productsCsvData): array
    {
        return $this->getFactory()
            ->createProductUpdater()
            ->updateProducts($productsCsvData);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $productData
     * @param string $priceType
     * @param string $priceField
     * @param string|null $pricePerKg
     *
     * @return void
     */
    public function saveSinglePrice(DataSetInterface $productData, string $priceType, string $priceField, ?string $pricePerKg = null): void
    {
        $this->getFactory()
            ->createProductPriceSaver()
            ->saveSinglePrice($productData, $priceType, $priceField, $pricePerKg);
    }
}
