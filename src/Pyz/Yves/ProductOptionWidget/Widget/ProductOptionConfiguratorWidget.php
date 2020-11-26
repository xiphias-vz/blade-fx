<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductOptionWidget\Widget;

use ArrayObject;
use Generated\Shared\Transfer\ProductAbstractOptionStorageTransfer;
use Generated\Shared\Transfer\ProductOptionGroupStorageTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use SprykerShop\Yves\ProductOptionWidget\Widget\ProductOptionConfiguratorWidget as SprykerProductOptionConfiguratorWidget;

/**
 * @method \SprykerShop\Yves\ProductOptionWidget\ProductOptionWidgetFactory getFactory()
 */
class ProductOptionConfiguratorWidget extends SprykerProductOptionConfiguratorWidget
{
    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\ProductOptionGroupStorageTransfer[]
     */
    protected function getProductOptionGroups(ProductViewTransfer $productViewTransfer): ArrayObject
    {
        $productAbstractOptionStorageTransfer = $this->getStorageProductOptionGroupCollectionTransfer($productViewTransfer);
        if (!$productAbstractOptionStorageTransfer) {
            return new ArrayObject();
        }

        $productAttributes = $productViewTransfer['attributes'];
        $currentProductOptionSkuPfand1 = 'OP_product_deposit_' .
            $productAttributes['pfand_1_sapnumber'] . '_' .
            $productAttributes['pfand_1_plu'] . '_' .
            $productAttributes['pfand_1_count'];

        $currentProductOptionSkuPfand2 = null;

        if (isset($productAttributes['pfand_2_plu'])) {
            $currentProductOptionSkuPfand2 = 'OP_product_deposit_' .
                $productAttributes['pfand_2_sapnumber'] . '_' .
                $productAttributes['pfand_2_plu'] . '_' .
                $productAttributes['pfand_2_count'];
        }

        $filteredProductAbstractOptionStorageTransfer = new ProductAbstractOptionStorageTransfer();

        foreach ($productAbstractOptionStorageTransfer->getProductOptionGroups() as $productOptionGroup) {
            $filteredProductOptionGroup = new ProductOptionGroupStorageTransfer();
            $filteredProductOptionGroup->setName($productOptionGroup->getName());

            foreach ($productOptionGroup->getProductOptionValues() as $productOptionValue) {
                if ($productOptionValue->getSku() === $currentProductOptionSkuPfand1) {
                    $filteredProductOptionGroup->addProductOptionValue($productOptionValue);
                }

                if ($productOptionValue->getSku() === $currentProductOptionSkuPfand2) {
                    $filteredProductOptionGroup->addProductOptionValue($productOptionValue);
                }
            }
            $filteredProductAbstractOptionStorageTransfer->addProductOptionGroup($filteredProductOptionGroup);
        }

        return $filteredProductAbstractOptionStorageTransfer->getProductOptionGroups();
    }
}
