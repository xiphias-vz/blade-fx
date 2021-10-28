<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business;

use Pyz\Zed\Cart\Business\Model\Operation;
use Pyz\Zed\Cart\Business\Model\ProductAvailability;
use Pyz\Zed\Cart\CartDependencyProvider;
use Spryker\Zed\Cart\Business\CartBusinessFactory as SprykerCartBusinessFactory;
use Spryker\Zed\Cart\Business\Model\OperationInterface;

class CartBusinessFactory extends SprykerCartBusinessFactory
{
    /**
     * @return \Spryker\Zed\Cart\Business\Model\OperationInterface
     */
    public function createCartOperation(): OperationInterface
    {
        $operation = new Operation(
            $this->createStorageProvider(),
            $this->getCalculatorFacade(),
            $this->getMessengerFacade(),
            $this->getQuoteFacade(),
            $this->getItemExpanderPlugins(),
            $this->getCartPreCheckPlugins(),
            $this->getPostSavePlugins(),
            $this->getTerminationPlugins(),
            $this->getCartRemovalPreCheckPlugins(),
            $this->getPostReloadItemsPlugins(),
            $this->getCartBeforePreCheckNormalizerPlugins()
        );

        $operation->setPreReloadLoadPlugins($this->getPreReloadItemsPlugins());

        return $operation;
    }

    /**
     * @return \Pyz\Zed\Cart\Business\Model\ProductAvailability
     */
    public function createProductAvailability(): ProductAvailability
    {
        return new ProductAvailability($this->getAvailabilityFacade());
    }

    /**
     * @return mixed
     */
    public function getAvailabilityFacade()
    {
        return $this->getProvidedDependency(CartDependencyProvider::FACADE_AVAILABILITY);
    }
}
