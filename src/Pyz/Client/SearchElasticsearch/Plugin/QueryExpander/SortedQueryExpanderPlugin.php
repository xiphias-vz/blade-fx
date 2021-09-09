<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\SearchElasticsearch\Plugin\QueryExpander;

use Elastica\Query;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedQueryExpanderPlugin as SpySortedQueryExpanderPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;

/**
 * @method \Spryker\Client\SearchElasticsearch\SearchElasticsearchFactory getFactory()
 */
class SortedQueryExpanderPlugin extends SpySortedQueryExpanderPlugin
{
    protected const KEY_SORTING_ORDER = 'integer-sort.sortingOrder';
    protected const KEY_SORTING_ORDER_DIRECTION = 'asc';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $requestParameters
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface
     */
    public function expandQuery(QueryInterface $searchQuery, array $requestParameters = []): QueryInterface
    {
        $this->addSortingToQuery($searchQuery->getSearchQuery(), $requestParameters);

        return $searchQuery;
    }

    /**
     * @param \Elastica\Query $query
     * @param array $requestParameters
     *
     * @return void
     */
    protected function addSortingToQuery(Query $query, array $requestParameters): void
    {
        parent::addSortingToQuery($query, $requestParameters);

        $nestedSortField = static::KEY_SORTING_ORDER;

        $sortRules = [
            $nestedSortField => [
                'order' => static::KEY_SORTING_ORDER_DIRECTION,
            ],
        ];

        $query->addSort($sortRules);
    }
}
