<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business;

use Pyz\Zed\ProductCartConnector\Business\Expander\ProductExpander;
use Spryker\Zed\ProductCartConnector\Business\ProductCartConnectorBusinessFactory as SprykerProductCartConnectorBusinessFactory;

/**
 * @method \Spryker\Zed\ProductCartConnector\ProductCartConnectorConfig getConfig()
 */
class ProductCartConnectorBusinessFactory extends SprykerProductCartConnectorBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpanderInterface
     */
    public function createProductExpander()
    {
        return new ProductExpander(
            $this->getLocaleFacade(),
            $this->getProductFacade()
        );
    }
}
