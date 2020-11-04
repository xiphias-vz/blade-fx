<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch;

use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Spryker\Zed\ProductPageSearch\ProductPageSearchConfig as SprykerProductPageSearchConfig;

class ProductPageSearchConfig extends SprykerProductPageSearchConfig
{
    /**
     * @return string[]
     */
    public function getSearchableAttributeKeys(): array
    {
        return $this->get(ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_KEYS, []);
    }
}
