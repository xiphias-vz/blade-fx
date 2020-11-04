<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Mapper;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;
use Pyz\Zed\ProductQuantityGui\Communication\Form\DataProvider\ProductQuantityFormDataProvider;
use Pyz\Zed\ProductQuantityGui\Communication\Form\ProductQuantityForm;

class ProductQuantityProductFormTransferMapperExpander implements ProductQuantityProductFormTransferMapperExpanderInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param array $formData
     *
     * @return \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    public function map(ProductConcreteTransfer $productConcreteTransfer, array $formData): ProductConcreteTransfer
    {
        $productQuantityTransfer = $this->createProductQuantityTransfer($formData);

        return $productConcreteTransfer->setProductQuantity($productQuantityTransfer);
    }

    /**
     * @param array $formData
     *
     * @return \Generated\Shared\Transfer\ProductQuantityTransfer
     */
    protected function createProductQuantityTransfer(array $formData): ProductQuantityTransfer
    {
        return (new ProductQuantityTransfer())
            ->setFkProduct($formData[ProductQuantityForm::FK_PRODUCT_QUANTITY])
            ->setQuantityInterval($formData[ProductQuantityForm::PRODUCT_QUANTITY_INTERVAL] ?? ProductQuantityFormDataProvider::DEFAULT_PRODUCT_QUANTITY_INTERVAL)
            ->setQuantityMin($formData[ProductQuantityForm::PRODUCT_QUANTITY_MIN] ?? ProductQuantityFormDataProvider::DEFAULT_PRODUCT_QUANTITY_MIN)
            ->setQuantityMax($formData[ProductQuantityForm::PRODUCT_QUANTITY_MAX]);
    }
}
