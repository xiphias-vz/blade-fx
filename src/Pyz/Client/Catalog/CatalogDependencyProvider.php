<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Catalog;

use Pyz\Client\OrderHistoryBoosting\Plugin\QueryExpander\OrderHistoryBoostingQueryExpanderPlugin;
use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\AscendingNameSortConfigTransferBuilderPlugin;
use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\CategoryFacetConfigTransferBuilderPlugin;
use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\DescendingNameSortConfigTransferBuilderPlugin;
use Spryker\Client\Catalog\Plugin\Elasticsearch\Query\ProductCatalogSearchQueryPlugin;
use Spryker\Client\Catalog\Plugin\Elasticsearch\QueryExpander\PaginatedProductConcreteCatalogSearchQueryExpanderPlugin;
use Spryker\Client\Catalog\Plugin\Elasticsearch\ResultFormatter\ProductConcreteCatalogSearchResultFormatterPlugin;
use Spryker\Client\Catalog\Plugin\Elasticsearch\ResultFormatter\RawCatalogSearchResultFormatterPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\ConfigTransferBuilder\AscendingPriceSortConfigTransferBuilderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\ConfigTransferBuilder\DescendingPriceSortConfigTransferBuilderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareCatalogSearchResultFormatterPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareSuggestionByTypeResultFormatter;
use Spryker\Client\CatalogPriceProductConnector\Plugin\ProductPriceQueryExpanderPlugin;
use Spryker\Client\ProductLabelStorage\Plugin\ProductLabelFacetConfigTransferBuilderPlugin;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\CompletionQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\FacetQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveInDateRangeQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\PaginatedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedCategoryQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SpellingSuggestionQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SuggestionByTypeQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\CompletionResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\FacetResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\PaginatedResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SpellingSuggestionResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SuggestionByTypeResultFormatterPlugin;
use SprykerEco\Client\FactFinderNg\Plugin\ElasticSearch\ResultFormatter\FactFinderSortedResultFormatterPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return \Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface[]
     */
    protected function getFacetConfigTransferBuilderPlugins(): array
    {
        return [
            new CategoryFacetConfigTransferBuilderPlugin(),
            new ProductLabelFacetConfigTransferBuilderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Catalog\Dependency\Plugin\SortConfigTransferBuilderPluginInterface[]
     */
    protected function getSortConfigTransferBuilderPlugins(): array
    {
        return [
            new AscendingNameSortConfigTransferBuilderPlugin(),
            new DescendingNameSortConfigTransferBuilderPlugin(),
            new AscendingPriceSortConfigTransferBuilderPlugin(),
            new DescendingPriceSortConfigTransferBuilderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
     */
    protected function createCatalogSearchQueryPlugin(): QueryInterface
    {
        return new ProductCatalogSearchQueryPlugin();
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new SortedQueryExpanderPlugin(),
            new SortedCategoryQueryExpanderPlugin(CategoryFacetConfigTransferBuilderPlugin::PARAMETER_NAME),
            new PaginatedQueryExpanderPlugin(),
            new SpellingSuggestionQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
            new OrderHistoryBoostingQueryExpanderPlugin(),
            new ProductPriceQueryExpanderPlugin(),

            /**
             * FacetQueryExpanderPlugin needs to be after other query expanders which filters down the results.
             */
            new FacetQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createCatalogSearchResultFormatterPlugins(): array
    {
        return [
            new FacetResultFormatterPlugin(),
            // new SortedResultFormatterPlugin(),
            new FactFinderSortedResultFormatterPlugin(),
            new PaginatedResultFormatterPlugin(),
            new CurrencyAwareCatalogSearchResultFormatterPlugin(
                new RawCatalogSearchResultFormatterPlugin()
            ),
            new SpellingSuggestionResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createSuggestionQueryExpanderPlugins(): array
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new CompletionQueryExpanderPlugin(),
            new SuggestionByTypeQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
            new OrderHistoryBoostingQueryExpanderPlugin(),
            new ProductPriceQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createSuggestionResultFormatterPlugins(): array
    {
        return [
            new CompletionResultFormatterPlugin(),
            new CurrencyAwareSuggestionByTypeResultFormatter(
                new SuggestionByTypeResultFormatterPlugin()
            ),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchCountQueryExpanderPlugins(): array
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
            new OrderHistoryBoostingQueryExpanderPlugin(),
            new ProductPriceQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getProductConcreteCatalogSearchResultFormatterPlugins(): array
    {
        return [
            new ProductConcreteCatalogSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new LocalizedQueryExpanderPlugin(),
            new PaginatedProductConcreteCatalogSearchQueryExpanderPlugin(),
        ];
    }
}
