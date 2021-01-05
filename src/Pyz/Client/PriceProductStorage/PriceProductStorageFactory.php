<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PriceProductStorage;

use Pyz\Client\PriceProductStorage\Expander\ProductViewPriceExpander;
use Pyz\Client\PriceProductStorage\Storage\PriceProductMapper;
use Spryker\Client\PriceProductStorage\PriceProductStorageFactory as SprykerPriceProductStorageFactory;
use Spryker\Client\PriceProductStorage\Storage\PriceAbstractStorageReader;
use Spryker\Client\PriceProductStorage\Storage\PriceProductMapperInterface;

class PriceProductStorageFactory extends SprykerPriceProductStorageFactory
{
    /**
     * @return \Spryker\Client\PriceProductStorage\Expander\ProductViewPriceExpanderInterface
     */
    public function createProductViewPriceExpander()
    {
        return new ProductViewPriceExpander(
            $this->createPriceAbstractStorageReader(),
            $this->createPriceConcreteStorageReader(),
            $this->getPriceProductClient(),
            $this->getPriceProductService(),
            $this->getPriceProductFilterExpanderPlugins()
        );
    }

    /**
     * @return \Spryker\Client\PriceProductStorage\Storage\PriceAbstractStorageReader
     */
    public function createPriceAbstractStorageReader()
    {
        return new PriceAbstractStorageReader(
            $this->getStorage(),
            $this->createPriceProductStorageKeyGenerator(),
            $this->createPriceProductMapper(),
            $this->getPriceDimensionPlugins(),
            $this->getPriceProductPricesExtractorPlugins()
        );
    }

    /**
     * @return \Spryker\Client\PriceProductStorage\Storage\PriceProductMapperInterface
     */
    public function createPriceProductMapper(): PriceProductMapperInterface
    {
        return new PriceProductMapper(
            $this->getPriceProductService()
        );
    }
}
