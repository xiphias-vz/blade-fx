<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication;

use Pyz\Zed\ProductQuantityGui\Communication\Form\DataProvider\ProductQuantityFormDataProvider;
use Pyz\Zed\ProductQuantityGui\Communication\Form\ProductQuantityForm;
use Pyz\Zed\ProductQuantityGui\Communication\Mapper\ProductQuantityProductFormTransferMapperExpander;
use Pyz\Zed\ProductQuantityGui\Communication\Mapper\ProductQuantityProductFormTransferMapperExpanderInterface;
use Pyz\Zed\ProductQuantityGui\Communication\TabCreator\ProductQuantityConcreteProductTabCreator;
use Pyz\Zed\ProductQuantityGui\Communication\TabCreator\ProductQuantityConcreteProductTabCreatorInterface;
use Pyz\Zed\ProductQuantityGui\ProductQuantityGuiDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface;

class ProductQuantityGuiCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\ProductQuantityGui\Communication\TabCreator\ProductQuantityConcreteProductTabCreatorInterface
     */
    public function createProductQuantityConcreteProductTabCreator(): ProductQuantityConcreteProductTabCreatorInterface
    {
        return new ProductQuantityConcreteProductTabCreator();
    }

    /**
     * @return \Pyz\Zed\ProductQuantityGui\Communication\Mapper\ProductQuantityProductFormTransferMapperExpanderInterface
     */
    public function createProductQuantityProductFormTransferMapperExpander(): ProductQuantityProductFormTransferMapperExpanderInterface
    {
        return new ProductQuantityProductFormTransferMapperExpander();
    }

    /**
     * @return \Pyz\Zed\ProductQuantityGui\Communication\Form\DataProvider\ProductQuantityFormDataProvider
     */
    public function createProductQuantityFormDataProvider(): ProductQuantityFormDataProvider
    {
        return new ProductQuantityFormDataProvider(
            $this->getProductQuantityFacade()
        );
    }

    /**
     * @return \Pyz\Zed\ProductQuantityGui\Communication\Form\ProductQuantityForm
     */
    public function createProductQuantityForm(): ProductQuantityForm
    {
        return new ProductQuantityForm();
    }

    /**
     * @return \Pyz\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface
     */
    public function getProductQuantityFacade(): ProductQuantityFacadeInterface
    {
        return $this->getProvidedDependency(ProductQuantityGuiDependencyProvider::FACADE_PRODUCT_QUANTITY);
    }
}
