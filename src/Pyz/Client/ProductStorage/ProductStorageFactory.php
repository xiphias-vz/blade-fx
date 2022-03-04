<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductStorage;

use Pyz\Client\ProductStorage\Mapper\ProductStorageDataMapper;
use Spryker\Client\ProductStorage\ProductStorageFactory as SprykerProductStorageFactory;

class ProductStorageFactory extends SprykerProductStorageFactory
{
    /**
     * @return \Spryker\Client\ProductStorage\Mapper\ProductStorageDataMapperInterface
     */
    public function createProductStorageDataMapper()
    {
        return new ProductStorageDataMapper(
            $this->getStorageProductExpanderPlugins(),
            $this->createProductAbstractAttributeMapRestrictionFilter()
        );
    }
}
