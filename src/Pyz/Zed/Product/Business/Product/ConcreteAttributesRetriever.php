<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business\Product;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\Product\Business\Product\ProductConcreteManagerInterface;

class ConcreteAttributesRetriever implements ConcreteAttributesRetrieverInterface
{
    /**
     * @var \Spryker\Zed\Product\Business\Product\ProductConcreteManagerInterface
     */
    private $concreteManager;

    /**
     * @param \Spryker\Zed\Product\Business\Product\ProductConcreteManagerInterface $concreteManager
     */
    public function __construct(
        ProductConcreteManagerInterface $concreteManager
    ) {
        $this->concreteManager = $concreteManager;
    }

    /**
     * @inheritDoc
     */
    public function getConcreteSkuToAttributesMap(array $skus, string $storeName): array
    {
        $productsConcreteTransfers = $this->concreteManager->findProductConcretesBySkus($skus);

        $concreteSkuToAttributesMap = [];

        foreach ($productsConcreteTransfers as $productConcreteTransfer) {
            $concreteSkuToAttributesMap[$productConcreteTransfer->getSku()] = $this->fetchAttributesByStoreName(
                $productConcreteTransfer,
                $storeName
            );
        }

        return $concreteSkuToAttributesMap;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param string $storeName
     *
     * @return string[]
     */
    protected function fetchAttributesByStoreName(
        ProductConcreteTransfer $productConcreteTransfer,
        string $storeName
    ): array {
        $concreteAttributes = $productConcreteTransfer->getAttributes();
        $concreteAttributes[ProductConfig::KEY_PRODUCT_NUMBER] = $productConcreteTransfer->getProductNumber();

        foreach (ProductConfig::PRODUCT_STORE_SPECIFIC_ATTRIBUTES as $attributeName) {
            $attributeKeyForCurrentStore = sprintf(
                ProductConfig::PRODUCT_STORE_ATTRIBUTE_FORMAT,
                $attributeName,
                $storeName
            );

            if (!empty($concreteAttributes[$attributeKeyForCurrentStore])) {
                $concreteAttributes[$attributeName] = $concreteAttributes[$attributeKeyForCurrentStore];
            }
        }

        return $concreteAttributes;
    }
}
