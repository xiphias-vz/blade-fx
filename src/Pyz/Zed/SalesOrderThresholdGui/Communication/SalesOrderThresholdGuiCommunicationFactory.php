<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication;

use Generated\Shared\Transfer\CurrencyTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\GlobalThresholdDataProvider;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\SalesOrderThresholdGuiCommunicationFactory as SprykerSalesOrderThresholdGuiCommunicationFactory;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiConfig getConfig()
 */
class SalesOrderThresholdGuiCommunicationFactory extends SprykerSalesOrderThresholdGuiCommunicationFactory
{
    /**
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createGlobalThresholdForm(
        StoreTransfer $storeTransfer,
        CurrencyTransfer $currencyTransfer
    ): FormInterface {
        $formDataProvider = $this->createGlobalThresholdDataProvider();

        return $this->getFormFactory()->create(
            GlobalThresholdType::class,
            $formDataProvider->getData($storeTransfer, $currencyTransfer),
            $formDataProvider->getOptions($currencyTransfer)
        );
    }

    /**
     * @return \Pyz\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\GlobalThresholdDataProvider
     */
    public function createGlobalThresholdDataProvider(): GlobalThresholdDataProvider
    {
        return new GlobalThresholdDataProvider(
            $this->getSalesOrderThresholdFacade(),
            $this->getCurrencyFacade(),
            $this->createGlobalSoftThresholdDataProviderResolver(),
            $this->getSalesOrderThresholdFormExpanderPlugins()
        );
    }
}
