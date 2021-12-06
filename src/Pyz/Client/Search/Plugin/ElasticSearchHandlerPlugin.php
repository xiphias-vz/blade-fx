<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Search\Plugin;

use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;

/**
 * @method \Pyz\Client\Search\SearchFactory getFactory()
 */
class ElasticSearchHandlerPlugin extends AbstractPlugin
{
    /**
     * @param \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $resultFormatters
     * @param array $requestParameters
     *
     * @return mixed
     */
    public function handle(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        // return $this->getFactory()->createElasticsearchSearchHandler()->search($searchQuery, $resultFormatters, $requestParameters);
        return $this->getFactory()->createSearchDelegator()->search($searchQuery, $resultFormatters, $requestParameters);
    }

    /**
     * @param array $requestParameters
     *
     * @return bool
     */
    public function isApplicable(array $requestParameters): bool
    {
        return true;
    }
}
