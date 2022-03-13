<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductStorage\Mapper;

use Generated\Shared\Transfer\ProductStorageCriteriaTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Spryker\Client\ProductStorage\Mapper\ProductStorageDataMapper as SprykerProductStorageDataMapper;
use Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductViewExpanderByCriteriaPluginInterface;

class ProductStorageDataMapper extends SprykerProductStorageDataMapper
{
    /**
     * @param string $locale
     * @param array $productStorageData
     * @param array $selectedAttributes
     * @param \Generated\Shared\Transfer\ProductStorageCriteriaTransfer|null $productStorageCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    public function mapProductStorageData(
        $locale,
        array $productStorageData,
        array $selectedAttributes = [],
        ?ProductStorageCriteriaTransfer $productStorageCriteriaTransfer = null
    ) {
        $productStorageData = $this->filterAbstractProductVariantsData($productStorageData);
        $productViewTransfer = $this->createProductViewTransfer($productStorageData);
        $productViewTransfer->setSelectedAttributes($selectedAttributes);

        if ($productStorageCriteriaTransfer != null) {
            $currentMerchant = $productStorageCriteriaTransfer->getMerchantReference();
            $productViewTransfer->setCurrentMerchant($currentMerchant);
            $this->setProductConcreteId($productViewTransfer);
        }

        foreach ($this->productStorageExpanderPlugins as $productViewExpanderPlugin) {
            if ($productViewExpanderPlugin instanceof ProductViewExpanderByCriteriaPluginInterface) {
                $productViewTransfer = $productViewExpanderPlugin->expandProductViewTransfer($productViewTransfer, $productStorageData, $locale, $productStorageCriteriaTransfer);

                continue;
            }

            $productViewTransfer = $productViewExpanderPlugin->expandProductViewTransfer($productViewTransfer, $productStorageData, $locale);
        }

        return $productViewTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return void
     */
    protected function setProductConcreteId(ProductViewTransfer &$productViewTransfer)
    {
        if (count($productViewTransfer->getAttributeMap()->getProductConcreteIds()) > 1) {
            $extension = "_" . $productViewTransfer->getCurrentMerchant();
            foreach ($productViewTransfer->getAttributeMap()->getProductConcreteIds() as $key => $concreteId) {
                if (str_contains($key, $extension)) {
                    $productViewTransfer->setIdProductConcrete((int)$concreteId);
                    $productViewTransfer->getAttributeMap()->setProductConcreteIds([$concreteId]);
                }
            }
        }
    }
}
