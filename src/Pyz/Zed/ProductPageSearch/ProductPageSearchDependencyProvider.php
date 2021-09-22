<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch;

use Orm\Zed\ProductSearch\Persistence\SpyProductSearchQuery;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConfig;
use Pyz\Zed\ProductPageSearch\Communication\Plugin\PageMapExpander\ProductAttributesMapExpanderPlugin;
use Spryker\Shared\ProductLabelSearch\ProductLabelSearchConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\PageDataExpander\ProductLabelDataLoaderExpanderPlugin;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\PageDataLoader\ProductLabelDataLoaderPlugin;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductLabelMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataExpander\PricePageDataLoaderExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataExpander\ProductCategoryPageDataLoaderExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataExpander\ProductImagePageDataLoaderExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataLoader\CategoryPageDataLoaderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataLoader\ImagePageDataLoaderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataLoader\PriceProductPageDataLoaderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductCategoryMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductImageMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductPriceMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];

        $dataExpanderPlugins[ProductLabelSearchConfig::PLUGIN_PRODUCT_LABEL_DATA] = new ProductLabelDataLoaderExpanderPlugin();
        $dataExpanderPlugins[ProductPageSearchConfig::PLUGIN_PRODUCT_CATEGORY_PAGE_DATA] = new ProductCategoryPageDataLoaderExpanderPlugin();
        $dataExpanderPlugins[ProductPageSearchConfig::PLUGIN_PRODUCT_PRICE_PAGE_DATA] = new PricePageDataLoaderExpanderPlugin();
        $dataExpanderPlugins[ProductPageSearchConfig::PLUGIN_PRODUCT_IMAGE_PAGE_DATA] = new ProductImagePageDataLoaderExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new ImagePageDataLoaderPlugin(),
            new CategoryPageDataLoaderPlugin(),
            new PriceProductPageDataLoaderPlugin(),
            new ProductLabelDataLoaderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductPriceMapExpanderPlugin(),
            new ProductCategoryMapExpanderPlugin(),
            new ProductImageMapExpanderPlugin(),
            new ProductLabelMapExpanderPlugin(),
            new ProductAttributesMapExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductSearchPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_PRODUCT_SEARCH, $container->factory(function () {
            return SpyProductSearchQuery::create();
        }));

        return $container;
    }
}
