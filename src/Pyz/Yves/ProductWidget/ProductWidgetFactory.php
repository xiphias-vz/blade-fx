<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductWidget;

use Spryker\Client\ProductStorage\ProductStorageClientInterface;
use SprykerShop\Yves\ProductWidget\ProductWidgetFactory as SprykerProductWidgetFactory;

/**
 * @method \Pyz\Yves\ProductWidget\ProductWidgetConfig getConfig()
 */
class ProductWidgetFactory extends SprykerProductWidgetFactory
{
    /**
     * @return \Spryker\Client\ProductStorage\ProductStorageClientInterface
     */
    public function getProductStorageClient(): ProductStorageClientInterface
    {
        return $this->getProvidedDependency(ProductWidgetDependencyProvider::CLIENT_PRODUCT_STORAGE);
    }
}
