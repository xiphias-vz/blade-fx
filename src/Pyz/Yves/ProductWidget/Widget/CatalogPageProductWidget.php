<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductWidget\Widget;

use SprykerShop\Yves\ProductWidget\Widget\CatalogPageProductWidget as SprykerCatalogPageProductWidget;

/**
 * @method \Pyz\Yves\ProductWidget\ProductWidgetFactory getFactory()
 * @method \Pyz\Yves\ProductWidget\ProductWidgetConfig getConfig()
 */
class CatalogPageProductWidget extends SprykerCatalogPageProductWidget
{
    /**
     * @param array $product
     * @param string|null $viewMode
     * @param string|null $loopIndex
     */
    public function __construct(array $product, $viewMode = null, $loopIndex = null)
    {
        $product = $this->expandAbstractProductDataWithAttributes($product);
        $this->addParameter('depositPrice', $this->getConfig()->getDepositPrice());
        $this->addParameter('position', $loopIndex);

        parent::__construct($product, $viewMode);
    }

    /**
     * @param array $product
     *
     * @return array
     */
    protected function expandAbstractProductDataWithAttributes(array $product): array
    {
        $productAbstractStorageData = $this->getFactory()
            ->getProductStorageClient()
            ->findProductAbstractStorageData($product['id_product_abstract'], $this->getLocale());

        if (isset($productAbstractStorageData["attribute_map"]["product_concrete_ids"]) && count($productAbstractStorageData["attribute_map"]["product_concrete_ids"]) > 1) {
            $merchantRef = $this->getFactory()->getQuoteClient()->getQuote()->getMerchantReference();
            $sku = str_replace("_abstract", "", $product["abstract_sku"]) . "_" . $merchantRef;
            $idConcrete = 0;
            foreach ($productAbstractStorageData["attribute_map"]["product_concrete_ids"] as $key => $item) {
                if ((string)$key === $sku) {
                    $idConcrete = $item;
                    break;
                }
            }
            if ($idConcrete > 0) {
                $productAbstractStorageData = $this->getFactory()
                    ->getProductStorageClient()
                    ->findProductConcreteStorageData($idConcrete, $this->getLocale());
            }
        }
        if ($productAbstractStorageData !== null) {
            if (!empty($productAbstractStorageData['attributes'])) {
                $product['attributes'] = $productAbstractStorageData['attributes'];
            }
        }

        return $product;
    }
}
