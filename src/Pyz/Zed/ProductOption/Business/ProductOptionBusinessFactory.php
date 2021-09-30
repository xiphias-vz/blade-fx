<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOption\Business;

use Pyz\Zed\ProductOption\Business\Expander\ProductOptionExpander;
use Spryker\Zed\ProductOption\Business\Expander\ProductOptionExpanderInterface;
use Spryker\Zed\ProductOption\Business\ProductOptionBusinessFactory as SprykerProductOptionBusinessFactory;

class ProductOptionBusinessFactory extends SprykerProductOptionBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductOption\Business\Expander\ProductOptionExpanderInterface
     */
    public function createProductOptionExpander(): ProductOptionExpanderInterface
    {
        return new ProductOptionExpander($this->getRepository());
    }
}
