<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring;

use Spryker\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin;
use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class MonitoringDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_ZED_REQUEST = 'CLIENT_ZED_REQUEST';
    public const CLIENT_MONITORING_STORAGE = 'CLIENT_MONITORING_STORAGE';
    public const CLIENT_SEARCH = 'CLIENT_SEARCH';
    public const CATALOG_SEARCH_QUERY_PLUGIN = 'MONITORING_SEARCH_QUERY_PLUGIN';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = $this->addZedRequestClient($container);
        $container = $this->addMonitoringStorageClient($container);
        $container = $this->addSearchClient($container);
        $container = $this->addCatalogSearchQueryPlugin($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addZedRequestClient(Container $container)
    {
        $container[static::CLIENT_ZED_REQUEST] = function (Container $container) {
            return $container->getLocator()->zedRequest()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addMonitoringStorageClient(Container $container)
    {
        $container[static::CLIENT_MONITORING_STORAGE] = function (Container $container) {
            return $container->getLocator()->monitoringStorage()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSearchClient(Container $container)
    {
        $container[static::CLIENT_SEARCH] = function (Container $container) {
            return $container->getLocator()->search()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addCatalogSearchQueryPlugin(Container $container)
    {
        $container[static::CATALOG_SEARCH_QUERY_PLUGIN] = function () {
            return $this->createCatalogSearchQueryPlugin();
        };

        return $container;
    }

    /**
     * @return \Spryker\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin
     */
    protected function createCatalogSearchQueryPlugin()
    {
        return new CatalogSearchQueryPlugin();
    }
}
