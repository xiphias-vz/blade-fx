<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProduct\Business;

use Pyz\Zed\PriceProduct\Business\Model\Reader;
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
}
