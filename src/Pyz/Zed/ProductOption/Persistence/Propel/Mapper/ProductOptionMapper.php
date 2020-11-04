<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOption\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\ProductAbstractOptionGroupStatusTransfer;
use Spryker\Zed\ProductOption\Persistence\Propel\Mapper\ProductOptionMapper as SprykerProductOptionMapper;

class ProductOptionMapper extends SprykerProductOptionMapper
{
    /**
     * @param array $productAbstractOptionGroupStatus
     *
     * @return \Generated\Shared\Transfer\ProductAbstractOptionGroupStatusTransfer
     */
    protected function mapProductAbstractOptionGroupStatusToTransfer(
        array $productAbstractOptionGroupStatus
    ): ProductAbstractOptionGroupStatusTransfer {
        $productAbstractOptionGroupStatusTransfer = parent::mapProductAbstractOptionGroupStatusToTransfer($productAbstractOptionGroupStatus);

        $productAbstractOptionGroupStatusTransfer->setIsActive((bool)$productAbstractOptionGroupStatusTransfer->getIsActive());

        return $productAbstractOptionGroupStatusTransfer;
    }
}
