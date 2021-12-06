<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Search;

use Pyz\Client\Search\Plugin\ElasticSearchHandlerPlugin;
use Spryker\Client\Kernel\Container;
use Spryker\Client\ProductSearchConfigStorage\Plugin\Config\ProductSearchConfigExpanderPlugin;
use Spryker\Client\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;
use Spryker\Client\SearchElasticsearch\Plugin\ElasticsearchSearchAdapterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ElasticsearchSearchContextExpanderPlugin;
use SprykerEco\Client\FactFinderNg\Plugin\FactFinderNgNavigationHandlerPlugin;
use SprykerEco\Client\FactFinderNg\Plugin\FactFinderNgSearchHandlerPlugin;
use SprykerEco\Client\FactFinderNg\Plugin\FactFinderNgSuggestHandlerPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    public const CLIENT_FACT_FINDER_NG = 'CLIENT_FACT_FINDER_NG';
    public const PLUGIN_SEARCH = 'SEARCH_PLUGINS';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container): Container
    {
        // tu staje sigurno
        $container = parent::provideServiceLayerDependencies($container);
        $container = $this->provideFactFinderNgClient($container);
        $container = $this->addSearchPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface[]
     */
    protected function createSearchConfigExpanderPlugins(Container $container)
    {
        $searchConfigExpanderPlugins = parent::createSearchConfigExpanderPlugins($container);

        $searchConfigExpanderPlugins[] = new ProductSearchConfigExpanderPlugin();

        return $searchConfigExpanderPlugins;
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface[]
     */
    protected function getClientAdapterPlugins(): array
    {
        return [
            new ElasticsearchSearchAdapterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextExpanderPluginInterface[]
     */
    protected function getSearchContextExpanderPlugins(): array
    {
        return [
            new ElasticsearchSearchContextExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function provideFactFinderNgClient(Container $container): Container
    {
        $container[static::CLIENT_FACT_FINDER_NG] = function (Container $container) {
            return $container->getLocator()->factFinderNg()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSearchPlugins(Container $container): Container
    {
        $container[static::PLUGIN_SEARCH] = function () {
            return $this->getSearchPlugins();
        };

        return $container;
    }

    /**
     * @return array
     */
    protected function getSearchPlugins(): array
    {
        return [
            new FactFinderNgNavigationHandlerPlugin(),
            new FactFinderNgSearchHandlerPlugin(),
            new FactFinderNgSuggestHandlerPlugin(),
            new ElasticSearchHandlerPlugin(),
        ];
    }
}
