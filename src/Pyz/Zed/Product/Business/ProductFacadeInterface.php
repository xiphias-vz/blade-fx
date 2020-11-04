<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business;

use Spryker\Zed\Product\Business\ProductFacadeInterface as SprykerProductFacadeInterface;

interface ProductFacadeInterface extends SprykerProductFacadeInterface
{
    /**
     * @param string[] $skus
     * @param string $storeName
     *
     * @return string[][]
     */
    public function getConcreteSkuToAttributesMap(array $skus, string $storeName): array;
}
