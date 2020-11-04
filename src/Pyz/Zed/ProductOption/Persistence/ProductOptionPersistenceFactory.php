<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOption\Persistence;

use Pyz\Zed\ProductOption\Persistence\Propel\Mapper\ProductOptionMapper;
use Spryker\Zed\ProductOption\Persistence\ProductOptionPersistenceFactory as SprykerProductOptionPersistenceFactory;
use Spryker\Zed\ProductOption\Persistence\Propel\Mapper\ProductOptionMapper as SprykerProductOptionMapper;

class ProductOptionPersistenceFactory extends SprykerProductOptionPersistenceFactory
{
    /**
     * @return \Spryker\Zed\ProductOption\Persistence\Propel\Mapper\ProductOptionMapper
     */
    public function createProductOptionMapper(): SprykerProductOptionMapper
    {
        return new ProductOptionMapper();
    }
}
