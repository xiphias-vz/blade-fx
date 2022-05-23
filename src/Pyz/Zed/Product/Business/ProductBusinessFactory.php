<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business;

use Pyz\Zed\Product\Business\Product\ConcreteAttributesRetriever;
use Pyz\Zed\Product\Business\Product\ConcreteAttributesRetrieverInterface;
use Pyz\Zed\Product\Business\Product\ProductAbstractManager;
use Pyz\Zed\Product\Business\Product\PyzStoreRelation\ProductAbstractPyzStoreRelationReader;
use Pyz\Zed\Product\Business\Product\PyzStoreRelation\ProductAbstractPyzStoreRelationReaderInterface;
use Pyz\Zed\Product\Business\Product\Url\ProductUrlGenerator;
use Spryker\Zed\Product\Business\ProductBusinessFactory as SprykerProductBusinessFactory;

/**
 * @method \Spryker\Zed\Product\ProductConfig getConfig()
 * @method \Pyz\Zed\Product\Persistence\ProductQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Product\Persistence\ProductRepositoryInterface getRepository()
 */
class ProductBusinessFactory extends SprykerProductBusinessFactory
{
    /**
     * @return \Pyz\Zed\Product\Business\Product\ConcreteAttributesRetrieverInterface
     */
    public function createConcreteAttributesRetriever(): ConcreteAttributesRetrieverInterface
    {
        return new ConcreteAttributesRetriever($this->createProductConcreteManager());
    }

    /**
     * @return \Pyz\Zed\Product\Business\Product\Url\ProductUrlGenerator
     */
    public function createProductUrlGenerator()
    {
        return new ProductUrlGenerator(
            $this->createProductAbstractNameGenerator(),
            $this->getLocaleFacade(),
            $this->getUtilTextService()
        );
    }

    /**
     * @return \Spryker\Zed\Product\Business\Product\ProductAbstractManagerInterface
     */
    public function createProductAbstractManager()
    {
        $productAbstractManager = new ProductAbstractManager(
            $this->getQueryContainer(),
            $this->getTouchFacade(),
            $this->getLocaleFacade(),
            $this->createProductAbstractAssertion(),
            $this->createSkuGenerator(),
            $this->createAttributeEncoder(),
            $this->createProductTransferMapper(),
            $this->createProductAbstractStoreRelationReader(),
            $this->createProductAbstractStoreRelationWriter()
        );

        $productAbstractManager->setEventFacade($this->getEventFacade());
        $productAbstractManager->attachBeforeCreateObserver($this->createProductAbstractBeforeCreateObserverPluginManager());
        $productAbstractManager->attachAfterCreateObserver($this->createProductAbstractAfterCreateObserverPluginManager());
        $productAbstractManager->attachBeforeUpdateObserver($this->createProductAbstractBeforeUpdateObserverPluginManager());
        $productAbstractManager->attachAfterUpdateObserver($this->createProductAbstractAfterUpdateObserverPluginManager());
        $productAbstractManager->attachAfterUpdateObserver($this->createProductAbstractAfterUpdateUrlObserver());
        $productAbstractManager->attachReadObserver($this->createProductAbstractReadObserverPluginManager());

        return $productAbstractManager;
    }

    /**
     * @return \Pyz\Zed\Product\Business\Product\PyzStoreRelation\ProductAbstractPyzStoreRelationReaderInterface
     */
    public function createProductAbstractPyzStoreRelationReader(): ProductAbstractPyzStoreRelationReaderInterface
    {
        return new ProductAbstractPyzStoreRelationReader($this->getQueryContainer());
    }
}
