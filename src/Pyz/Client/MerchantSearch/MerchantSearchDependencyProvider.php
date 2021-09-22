<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;
use Spryker\Client\Kernel\Container as SprykerContainer;
use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query\PaginatedMerchantSearchQueryExpanderPlugin;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter\MerchantSearchResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    public const CLIENT_MERCHANT_STORAGE = 'CLIENT_MERCHANT_STORAGE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container): Container
    {
        parent::provideServiceLayerDependencies($container);
        $container = $this->addMerchantStorageClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addMerchantStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_MERCHANT_STORAGE, function (SprykerContainer $container) {
            return $container->getLocator()->merchantStorage()->client();
        });

        return $container;
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getMerchantSearchResultFormatterPlugins(): array
    {
        return [
            new MerchantSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getMerchantSearchQueryExpanderPlugins(): array
    {
        return [
            new PaginatedMerchantSearchQueryExpanderPlugin(),
            new StoreQueryExpanderPlugin(),
        ];
    }
}
