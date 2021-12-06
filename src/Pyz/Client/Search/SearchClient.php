<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Search;

use Spryker\Client\Search\SearchClient as SprykerSearchClient;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;

/**
 * @method \Spryker\Client\Search\SearchFactory getFactory()
 */
class SearchClient extends SprykerSearchClient
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[] $resultFormatters
     * @param array $requestParameters
     *
     * @return array|\Elastica\ResultSet
     */
    public function search(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        /*return $this
            ->getFactory()
            ->createSearchRouter()
            ->search($searchQuery, $resultFormatters, $requestParameters);*/

        return $this
            ->getFactory()
            ->createSearchDelegator()
            ->search($searchQuery, $resultFormatters, $requestParameters);
    }
}
