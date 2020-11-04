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
     */
    public function __construct(array $product, $viewMode = null)
    {
        $product = $this->expandAbstractProductDataWithAttributes($product);
        $this->addParameter('depositPrice', $this->getConfig()->getDepositPrice());

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

        if ($productAbstractStorageData !== null) {
            if (!empty($productAbstractStorageData['attributes'])) {
                $product['attributes'] = $productAbstractStorageData['attributes'];
            }
        }

        return $product;
    }
}
