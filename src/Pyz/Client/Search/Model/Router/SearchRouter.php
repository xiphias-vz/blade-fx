<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Search\Model\Router;

use Generated\Shared\Transfer\FactFinderNgResponseTransfer;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;

class SearchRouter implements SearchRouterInterface
{
    /**
     * @var array
     */
    protected $searchPlugins;

    /**
     * @param array $searchPlugins
     */
    public function __construct(array $searchPlugins)
    {
        $this->searchPlugins = $searchPlugins;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $resultFormatters
     * @param array $requestParameters
     *
     * @return array|\Elastica\ResultSet
     */
    public function search(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        foreach ($this->searchPlugins as $searchPlugin) {
            if ($searchPlugin->isApplicable($requestParameters)) {
                return $searchPlugin->handle($searchQuery, $resultFormatters, $requestParameters);
            }
        }

        return [];
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $resultFormatters
     * @param array $requestParameters
     *
     * @return array|\Elastica\ResultSet
     */
    public function suggest(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        // TODO: Implement suggest() method.
        return [];
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $resultFormatters
     * @param array $requestParameters
     *
     * @return array|\Elastica\ResultSet|void
     */
    public function navigation(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        // TODO: Implement navigation() method.
        return [];
    }

    public function trackCheckoutEvent(array $cartOrCheckoutEventTransfers): FactFinderNgResponseTransfer
    {
        // TODO: Implement trackCheckoutEvent() method.
        return new FactFinderNgResponseTransfer();
    }

    public function trackCartEvent(array $cartOrCheckoutEventTransfers): FactFinderNgResponseTransfer
    {
        // TODO: Implement trackCartEvent() method.
        return new FactFinderNgResponseTransfer();
    }

    public function trackClickEvent(array $clickEventTransfers): FactFinderNgResponseTransfer
    {
        // TODO: Implement trackClickEvent() method.
        return new FactFinderNgResponseTransfer();
    }

    public function triggerSearchImport(): FactFinderNgResponseTransfer
    {
        // TODO: Implement triggerSearchImport() method.
        return new FactFinderNgResponseTransfer();
    }
}
