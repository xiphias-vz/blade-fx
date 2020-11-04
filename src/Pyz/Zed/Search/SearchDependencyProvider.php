<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Search;

use Pyz\Zed\CategoryPageSearch\Communication\Plugin\Search\CategoryNodeDataPageMapBuilder;
use Spryker\Zed\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;
use Spryker\Zed\SearchElasticsearch\Communication\Plugin\Search\ElasticsearchIndexInstallerPlugin;
use Spryker\Zed\SearchElasticsearch\Communication\Plugin\Search\ElasticsearchIndexMapInstallerPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface[]
     */
    protected function getSearchSourceInstallerPlugins(): array
    {
        return [
            new ElasticsearchIndexInstallerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface[]
     */
    protected function getSearchMapInstallerPlugins(): array
    {
        return [
            new ElasticsearchIndexMapInstallerPlugin(),
        ];
    }

    /**
     * @deprecated Will be removed without replacement.
     *
     * @return \Spryker\Zed\Search\Dependency\Plugin\PageMapInterface[]
     */
    protected function getSearchPageMapPlugins()
    {
        return [
            new CategoryNodeDataPageMapBuilder(),
        ];
    }
}
