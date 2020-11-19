<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use StoreApp\Zed\Picker\Business\Creator\OrderContainersCreator;
use StoreApp\Zed\Picker\Business\Creator\OrderContainersCreatorInterface;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdater;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface;
use StoreApp\Zed\Picker\PickerDependencyProvider;

/**
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class PickerBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface
     */
    public function createOrderUpdater(): OrderUpdaterInterface
    {
        return new OrderUpdater(
            $this->getOmsFacade(),
            $this->getSalesFacade()
        );
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Creator\OrderContainersCreatorInterface
     */
    public function createOrderContainersCreator(): OrderContainersCreatorInterface
    {
        return new OrderContainersCreator(
            $this->getOrderContainerFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_OMS);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface
     */
    public function getOrderContainerFacade(): OrderContainerFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_ORDER_CONTAINER);
    }
}
