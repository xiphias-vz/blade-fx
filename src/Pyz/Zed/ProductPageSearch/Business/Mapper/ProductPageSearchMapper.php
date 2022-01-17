<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business\Mapper;

use Spryker\Zed\ProductPageSearch\Business\Mapper\ProductPageSearchMapper as SprykerProductPageSearchMapper;

class ProductPageSearchMapper extends SprykerProductPageSearchMapper implements ProductPageSearchMapperInterface
{
    public function mapToProductPageSearchTransfer(array $productAbstractLocalizedData)
    {
        $productPageTransfer = parent::mapToProductPageSearchTransfer($productAbstractLocalizedData);
        $productPageTransfer->setSapNumber($productAbstractLocalizedData['SpyProductAbstract']['sap_number']);

        return $productPageTransfer;
    }
}
