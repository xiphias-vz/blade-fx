<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductComparativePriceWidget;

use Pyz\Yves\ProductComparativePriceWidget\Calculator\ProductComparativePriceCalculator;
use Pyz\Yves\ProductComparativePriceWidget\Calculator\ProductComparativePriceCalculatorInterface;
use Spryker\Client\Currency\CurrencyClientInterface;
use Spryker\Client\GlossaryStorage\GlossaryStorageClientInterface;
use Spryker\Client\Locale\LocaleClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class ProductComparativePriceWidgetFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Yves\ProductComparativePriceWidget\Calculator\ProductComparativePriceCalculatorInterface
     */
    public function createProductComparativePriceCalculator(): ProductComparativePriceCalculatorInterface
    {
        return new ProductComparativePriceCalculator(
            $this->getCurrencyClient(),
            $this->getGlossaryStorageClient(),
            $this->getLocaleClient()
        );
    }

    /**
     * @return \Spryker\Client\Currency\CurrencyClientInterface
     */
    public function getCurrencyClient(): CurrencyClientInterface
    {
        return $this->getProvidedDependency(ProductComparativePriceWidgetDependencyProvider::CLIENT_CURRENCY);
    }

    /**
     * @return \Spryker\Client\GlossaryStorage\GlossaryStorageClientInterface
     */
    public function getGlossaryStorageClient(): GlossaryStorageClientInterface
    {
        return $this->getProvidedDependency(ProductComparativePriceWidgetDependencyProvider::CLIENT_GLOSSARY_STORAGE);
    }

    /**
     * @return \Spryker\Client\Locale\LocaleClientInterface
     */
    public function getLocaleClient(): LocaleClientInterface
    {
        return $this->getProvidedDependency(ProductComparativePriceWidgetDependencyProvider::CLIENT_LOCALE);
    }
}
