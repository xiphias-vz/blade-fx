<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductSetWidget;

use SprykerShop\Yves\ProductSetWidget\ProductSetWidgetFactory as SprykerProductSetWidgetFactory;
use Symfony\Component\HttpFoundation\RequestStack;

class ProductSetWidgetFactory extends SprykerProductSetWidgetFactory
{
    /**
     * @return \Spryker\Client\ProductStorage\ProductStorageClientInterface
     */
    public function getProductStorageClient()
    {
        return $this->getProvidedDependency(ProductSetWidgetDependencyProvider::CLIENT_PRODUCT_STORAGE);
    }

    /**
     * @return \Spryker\Client\ProductSetStorage\ProductSetStorageClientInterface
     */
    public function getProductSetStorageClient()
    {
        return $this->getProvidedDependency(ProductSetWidgetDependencyProvider::CLIENT_PRODUCT_SET_STORAGE);
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Request
     */
    public function getRequest()
    {
        return $this->getRequestStack()->getCurrentRequest();
    }

    /**
     * @return \Symfony\Component\HttpFoundation\RequestStack
     */
    public function getRequestStack(): RequestStack
    {
        return $this->getProvidedDependency(ProductSetWidgetDependencyProvider::SERVICE_REQUEST_STACK);
    }
}
