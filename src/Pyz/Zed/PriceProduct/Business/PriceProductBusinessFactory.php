<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProduct\Business;

use Pyz\Zed\PriceProduct\Business\Model\PriceGrouper;
use Pyz\Zed\PriceProduct\Business\Model\Reader;
use Spryker\Zed\PriceProduct\Business\Model\PriceGrouperInterface;
use Pyz\Zed\PriceProduct\Business\Model\Product\PriceProductExpander;
use Spryker\Zed\PriceProduct\Business\Model\Product\PriceProductExpanderInterface;
use Spryker\Zed\PriceProduct\Business\Model\ReaderInterface;
use Spryker\Zed\PriceProduct\Business\PriceProductBusinessFactory as SprykerPriceProductBusinessFactory;

/**
 * @method \Spryker\Zed\PriceProduct\PriceProductConfig getConfig()
 * @method \Spryker\Zed\PriceProduct\Persistence\PriceProductQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\PriceProduct\Persistence\PriceProductRepositoryInterface getRepository()
 * @method \Spryker\Zed\PriceProduct\Persistence\PriceProductEntityManagerInterface getEntityManager()
 */
class PriceProductBusinessFactory extends SprykerPriceProductBusinessFactory
{
    /**
     * @return \Spryker\Zed\PriceProduct\Business\Model\ReaderInterface
     */
    public function createReaderModel(): ReaderInterface
    {
        return new Reader(
            $this->getProductFacade(),
            $this->createPriceTypeReader(),
            $this->createPriceProductConcreteReader(),
            $this->createPriceProductAbstractReader(),
            $this->createProductCriteriaBuilder(),
            $this->createPriceProductMapper(),
            $this->getConfig(),
            $this->getPriceProductService()
        );
    }

    /**
     * @return \Spryker\Zed\PriceProduct\Business\Model\PriceGrouperInterface
     */
    public function createPriceGrouper(): PriceGrouperInterface
    {
        return new PriceGrouper(
            $this->createReaderModel(),
            $this->createPriceProductMapper(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\PriceProduct\Business\Model\Product\PriceProductExpanderInterface
     */
    public function createPriceProductExpander(): PriceProductExpanderInterface
    {
        return new PriceProductExpander(
            $this->getPriceProductDimensionExpanderStrategyPlugins(),
            $this->getConfig(),
            $this->getPriceProductService()
        );
    }
}
