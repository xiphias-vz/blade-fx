<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPageDE;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Yves\CatalogPage\CatalogPageDependencyProvider;
use Pyz\Yves\CatalogPage\Twig\CategoryFilterTwigExtension;
use Pyz\Yves\CustomerPage\CustomerPageDependencyProvider;
use Spryker\Service\UtilText\UtilTextServiceInterface;
use Spryker\Shared\Twig\TwigExtension;
use SprykerShop\Yves\CatalogPage\CatalogPageFactory as SprykerCatalogPageFactory;

class CatalogPageFactory extends SprykerCatalogPageFactory
{
    /**
     * @return \Spryker\Shared\Twig\TwigExtension
     */
    public function createCategoryFilterTwigExtension(): TwigExtension
    {
        return new CategoryFilterTwigExtension();
    }

    /**
     * @return \Spryker\Service\UtilText\UtilTextServiceInterface
     */
    public function getUtilTextService(): UtilTextServiceInterface
    {
        return $this->getProvidedDependency(CatalogPageDependencyProvider::SERVICE_UTIL_TEXT);
    }

    /**
     * @return \Pyz\Service\DataDog\DataDogServiceInterface
     */
    public function getDataDogService(): DataDogServiceInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::SERVICE_DATA_DOG);
    }
}
