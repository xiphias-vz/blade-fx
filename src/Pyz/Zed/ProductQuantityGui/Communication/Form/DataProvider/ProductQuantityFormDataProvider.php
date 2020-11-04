<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Form\DataProvider;

use Pyz\Zed\ProductQuantityGui\Communication\Form\ProductQuantityForm;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface;

class ProductQuantityFormDataProvider
{
    public const DEFAULT_PRODUCT_QUANTITY_INTERVAL = 1;
    public const DEFAULT_PRODUCT_QUANTITY_MIN = 1;

    /**
     * @var \Spryker\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface
     */
    protected $productQuantityFacade;

    /**
     * @param \Spryker\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface $productQuantityFacade
     */
    public function __construct(ProductQuantityFacadeInterface $productQuantityFacade)
    {
        $this->productQuantityFacade = $productQuantityFacade;
    }

    /**
     * @param int $idProduct
     *
     * @return array
     */
    public function getData(int $idProduct)
    {
        $productQuantityData = $this->getDefaultProductQuantityData($idProduct);
        $productQuantityTransfers = $this->productQuantityFacade->findProductQuantityTransfersByProductIds([$idProduct]);

        if ($productQuantityTransfers === []) {
            return $productQuantityData;
        }

        $productQuantityData[ProductQuantityForm::FK_PRODUCT_QUANTITY] = $productQuantityTransfers[0]->getFkProduct();
        $productQuantityData[ProductQuantityForm::PRODUCT_QUANTITY_MAX] = $productQuantityTransfers[0]->getQuantityMax();

        return $productQuantityData;
    }

    /**
     * @param int $idProduct
     *
     * @return array
     */
    protected function getDefaultProductQuantityData(int $idProduct): array
    {
        return [
            ProductQuantityForm::FK_PRODUCT_QUANTITY => $idProduct,
            ProductQuantityForm::PRODUCT_QUANTITY_INTERVAL => static::DEFAULT_PRODUCT_QUANTITY_INTERVAL,
            ProductQuantityForm::PRODUCT_QUANTITY_MIN => static::DEFAULT_PRODUCT_QUANTITY_INTERVAL,
        ];
    }
}
