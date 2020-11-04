<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductStorage\Plugin;

use Generated\Shared\Transfer\ProductStorageCriteriaTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductViewExpanderByCriteriaPluginInterface;

/**
 * @method \Spryker\Client\ProductStorage\ProductStorageFactory getFactory()
 */
class StoreSpecificAttributesExpanderPlugin extends AbstractPlugin implements ProductViewExpanderByCriteriaPluginInterface
{
    /**
     * @inheritDoc
     */
    public function expandProductViewTransfer(
        ProductViewTransfer $productViewTransfer,
        array $productData,
        $localeName,
        ?ProductStorageCriteriaTransfer $productStorageCriteriaTransfer = null
    ): ProductViewTransfer {
        if ($productStorageCriteriaTransfer === null
            || $productStorageCriteriaTransfer->getStore() === null
            || !$productViewTransfer->getAttributes()
        ) {
            return $productViewTransfer;
        }
        $this->setAttributeValueByStore($productViewTransfer, $productStorageCriteriaTransfer);

        return $productViewTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     * @param \Generated\Shared\Transfer\ProductStorageCriteriaTransfer $productStorageCriteriaTransfer
     *
     * @return void
     */
    private function setAttributeValueByStore(
        ProductViewTransfer $productViewTransfer,
        ProductStorageCriteriaTransfer $productStorageCriteriaTransfer
    ): void {
        $productAttributes = $productViewTransfer->getAttributes();
        $currentStore = $productStorageCriteriaTransfer->getStore();
        foreach (ProductConfig::PRODUCT_STORE_SPECIFIC_ATTRIBUTES as $attribute) {
            $attributeNameForCurrentStore = $this->getStoreSpecificAttributeName($attribute, $currentStore);
            if (empty($productAttributes[$attributeNameForCurrentStore])) {
                continue;
            }
            $storeSpecificValue = $productAttributes[$attributeNameForCurrentStore];
            $productAttributes[$attribute] = $storeSpecificValue;
        }

        $productViewTransfer->setAttributes($productAttributes);
    }

    /**
     * @param string $attribute
     * @param string $storeName
     *
     * @return string
     */
    private function getStoreSpecificAttributeName(string $attribute, string $storeName): string
    {
        return sprintf(ProductConfig::PRODUCT_STORE_ATTRIBUTE_FORMAT, $attribute, $storeName);
    }
}
