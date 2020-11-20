<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
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
}
