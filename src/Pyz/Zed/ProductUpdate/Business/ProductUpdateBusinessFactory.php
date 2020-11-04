<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Business;

use NumberFormatter;
use Pyz\Zed\DataImport\Business\DataImportFacade;
use Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver;
use Pyz\Zed\ProductUpdate\Business\Model\ProductUpdater;
use Pyz\Zed\ProductUpdate\ProductUpdateDependencyProvider;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Product\Persistence\ProductQueryContainer;

/**
 * @method \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface getRepository()
 */
class ProductUpdateBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\ProductUpdate\Business\Model\ProductUpdater
     */
    public function createProductUpdater(): ProductUpdater
    {
        return new ProductUpdater(
            $this->createProductPriceSaver(),
            $this->getProductQueryContainer(),
            $this->getRepository()
        );
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\DataImportFacade
     */
    public function getDataImportFacade(): DataImportFacade
    {
        return $this->getProvidedDependency(ProductUpdateDependencyProvider::FACADE_DATA_IMPORT);
    }

    /**
     * @return \Spryker\Zed\Product\Persistence\ProductQueryContainer
     */
    public function getProductQueryContainer(): ProductQueryContainer
    {
        return $this->getProvidedDependency(ProductUpdateDependencyProvider::QUERY_CONTAINER_PRODUCT);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getStore(): Store
    {
        return $this->getProvidedDependency(ProductUpdateDependencyProvider::STORE);
    }

    /**
     * @return \Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver
     */
    public function createProductPriceSaver(): ProductPriceSaver
    {
        return new ProductPriceSaver(
            $this->createNumberFormatter(),
            $this->getMoneyFacade()
        );
    }

    /**
     * @return \NumberFormatter
     */
    protected function createNumberFormatter(): NumberFormatter
    {
        return new NumberFormatter(
            $this->getStore()->getCurrentLocale(),
            NumberFormatter::DECIMAL
        );
    }

    /**
     * @return \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    public function getMoneyFacade(): MoneyFacadeInterface
    {
        return $this->getProvidedDependency(ProductUpdateDependencyProvider::FACADE_MONEY);
    }
}
