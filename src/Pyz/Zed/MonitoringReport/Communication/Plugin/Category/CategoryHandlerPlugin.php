<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Plugin\Category;

use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\Term;
use Elastica\ResultSet;
use Generated\Shared\Search\PageIndexMap;
use Generated\Shared\Transfer\ElasticsearchSearchContextTransfer;
use Generated\Shared\Transfer\SearchContextTransfer;
use InvalidArgumentException;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;
use Pyz\Shared\PropelExtension\PropelExtension;
use Pyz\Zed\MonitoringReport\Communication\Console\CategoryCheckConsole;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Query\CategoryProductAbstractKeysQuery;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class CategoryHandlerPlugin extends AbstractPlugin
{
    public const ROLE_NAME = 'CATEGORY';
    public const NO_CATEGORY = 'NO-CATEGORY';
    public const TOTAL = 'TOTAL';

    /**
     * @return void
     */
    public function execute()
    {
        PropelExtension::execute("call pyzx_monitoring_category()");
        $this->updateSearchResults();
        $this->sendResultsToEmail();
    }

    /**
     * @return void
     */
    protected function updateSearchResults()
    {
        $codeBucket = getenv('SPRYKER_CODE_BUCKET');
        if ($codeBucket === "DE") {
            $this->updateSearchResultsDE();
        } else {
            $this->updateSearchResultsCZ();
        }
    }

    /**
     * @return void
     */
    protected function updateSearchResultsCZ()
    {
        $data = $this->getRepository()->getCategoryMonitoringData();
        /**@var \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories $item */
        foreach ($data as $item) {
            if ($item->getCategoryName() != self::NO_CATEGORY) {
                $indexNme = $this->getIndexName($item->getStoreName());
                $res = $this->getSearchResult($indexNme, $item->getFkCategory());
                $hits = $res->getTotalHits();
                $item->setNumberOfProductsSearch($hits);
                if ($item->getFkCategory() > 0) {
                    $resKeys = $this->getAbstractKeysByCategory($indexNme, $item->getFkCategory(), $item->getStoreName());
                    $data = $this->getKeyList($resKeys);
                    $item->setEsAbstractKeys(json_encode($data));
                }
                $item->save();
            }
        }
    }

    /**
     * @param \Elastica\ResultSet $set
     *
     * @return array
     */
    protected function getKeyList(ResultSet $set): array
    {
        $data = [];
        foreach ($set as $result) {
            $data[] = $result->getHit()["_id"];
        }

        return $data;
    }

    /**
     * @return void
     */
    protected function updateSearchResultsDE()
    {
        $ffData = null;
        $activeMerchanList = SpyMerchantQuery::create()->findByIsActive(true);
        foreach ($activeMerchanList as $merchant) {
            $ffData[$merchant->getMerchantShortName()] = $this->getFactFinderCategories($merchant->getMerchantReference());
            $ffData[$merchant->getMerchantShortName() . "_" . self::TOTAL] = $this->getFactFinderSearch($merchant->getMerchantReference(), "*");
        }
        $data = $this->getRepository()->getCategoryMonitoringData();
        /**@var \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories $item */
        foreach ($data as $item) {
            if ($item->getCategoryName() === self::TOTAL) {
                $hits = $this->getFactFinderSearchTotalHits($ffData, $item->getStoreName());
                $item->setNumberOfProductsSearch($hits);
                $item->save();
            } elseif ($item->getCategoryName() != self::NO_CATEGORY) {
                $hits = $this->getFactFinderTotalHits($ffData, $item->getCategoryName(), $item->getStoreName());
                $item->setNumberOfProductsSearch($hits);
                $item->save();
            }
        }
    }

    /**
     * @param array $ffData
     * @param string $categoryName
     * @param string $storeName
     *
     * @return int
     */
    protected function getFactFinderTotalHits(array $ffData, string $categoryName, string $storeName): int
    {
        foreach ($ffData[$storeName]["facets"][0]["elements"] as $item) {
            if ($item["text"] === $categoryName) {
                return $item["totalHits"];
            }
        }

        return 0;
    }

    /**
     * @param array $ffData
     * @param string $storeName
     *
     * @return int|null
     */
    protected function getFactFinderSearchTotalHits(array $ffData, string $storeName): ?int
    {
        if (isset($ffData[$storeName . "_" . self::TOTAL]["totalHits"])) {
            return $ffData[$storeName . "_" . self::TOTAL]["totalHits"];
        }

        return 0;
    }

    /**
     * @return void
     */
    protected function sendResultsToEmail()
    {
        $mailsToSend = $this->getRepository()->getEmailListForRoleName(static::ROLE_NAME);
        if (count($mailsToSend) > 0) {
            $content = $this->getMailContent();
            foreach ($mailsToSend as $mail) {
                $this->getRepository()->setEmailToSend(CategoryCheckConsole::COMMAND_DESCRIPTION, $mail, '', $content, true);
            }
        }
    }

    /**
     * @return string
     */
    protected function getMailContent(): string
    {
        $header = "<table border='1' style='border-collapse: collapse;'>
        <thead>
            <tr>
                <th>store</th>
                <th>category</th>
                <th>url</th>
                <th>products_db</th>
                <th>products_search</th>
            </tr>
        </thead>";
        $data = $this->getRepository()->getCategoryMonitoringData();
        /**@var \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories $item */
        $content = "";
        foreach ($data as $item) {
            if ($item->getNumberOfProductsDb() !== $item->getNumberOfProductsSearch()) {
                $content .= PHP_EOL;
                $content .= sprintf(
                    '<tr><td>%s</td><td>%s</td><td>%s</td><td>%d</td><td>%d</td></tr>',
                    $item->getStoreName(),
                    $item->getCategoryName(),
                    $item->getCategoryUrl(),
                    $item->getNumberOfProductsDb(),
                    $item->getNumberOfProductsSearch()
                );
            }
        }

        return $header . $content . "</table>";
    }

    /**
     * @param string $indexName
     * @param int|null $idCategoryNode
     *
     * @return array|\Elastica\ResultSet
     */
    protected function getSearchResult(string $indexName, ?int $idCategoryNode)
    {
        $searchSearchContext = $this->createSearchContextTransfer($indexName);
        $searchQuery = $this->getFactory()->getCatalogSearchQuery("");
        $searchQuery->setSearchContext($searchSearchContext);
        $this->addCategoryFilter($searchQuery, $idCategoryNode);
        $this->addCategoryProductSorting($searchQuery, $idCategoryNode);

        return $this->getFactory()->getSearchClient()->search($searchQuery);
    }

    /**
     * @param string $merchantReference
     *
     * @return array
     */
    protected function getFactFinderCategories(string $merchantReference)
    {
        return FactFinderApiClient::getNavigation($merchantReference);
    }

    /**
     * @param string $merchantReference
     * @param string $searchTerm
     *
     * @return array
     */
    protected function getFactFinderSearch(string $merchantReference, string $searchTerm)
    {
        return FactFinderApiClient::getSearch($merchantReference, $searchTerm);
    }

    /**
     * @param string $storeName
     *
     * @return string
     */
    protected function getIndexName(string $storeName): string
    {
        return strtolower($storeName) . "_page";
    }

    /**
     * @param string $indexName
     *
     * @return \Generated\Shared\Transfer\SearchContextTransfer
     */
    protected function createSearchContextTransfer(string $indexName): SearchContextTransfer
    {
        $elasticsearchSearchContext = new ElasticsearchSearchContextTransfer();
        $elasticsearchSearchContext->setIndexName($indexName);
        $searchSearchContext = new SearchContextTransfer();
        $searchSearchContext->setElasticsearchContext($elasticsearchSearchContext);

        return $searchSearchContext;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param int|null $idCategoryNode
     *
     * @return void
     */
    protected function addCategoryProductSorting(QueryInterface $searchQuery, ?int $idCategoryNode): void
    {
        $sortFieldName = sprintf(
            '%s.%s',
            PageIndexMap::INTEGER_SORT,
            $this->buildSortFieldName($idCategoryNode)
        );

        $searchQuery
            ->getSearchQuery()
            ->addSort([
                $sortFieldName => [
                    'order' => 'ASC',
                    'mode' => 'min',
                    'unmapped_type' => 'integer',
                ],
            ]);
    }

    /**
     * @param int|null $idCategoryNode
     *
     * @return string
     */
    protected function buildSortFieldName(?int $idCategoryNode): string
    {
        return sprintf(
            '%s:%d',
            PageIndexMap::CATEGORY,
            $idCategoryNode
        );
    }

    /**
     * @param \Elastica\Query $query
     *
     * @throws \InvalidArgumentException
     *
     * @return \Elastica\Query\BoolQuery
     */
    protected function getBoolQuery(Query $query): BoolQuery
    {
        $boolQuery = $query->getQuery();
        if (!$boolQuery instanceof BoolQuery) {
            throw new InvalidArgumentException(sprintf('Facet filters available only with %s, got: %s', BoolQuery::class, get_class($boolQuery)));
        }

        return $boolQuery;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param int|null $idCategoryNode
     *
     * @return void
     */
    protected function addCategoryFilter(QueryInterface $searchQuery, ?int $idCategoryNode): void
    {
        if ($idCategoryNode && $idCategoryNode > 0) {
            $boolQuery = $this->getBoolQuery($searchQuery->getSearchQuery());
            $boolQuery->addFilter((new Term())
                ->setTerm(PageIndexMap::CATEGORY_ALL_PARENTS, $idCategoryNode));
        }
    }

    /**
     * @param string $indexName
     * @param int $idCategory
     * @param string $storeName
     *
     * @return array|\Elastica\ResultSet
     */
    protected function getAbstractKeysByCategory(string $indexName, int $idCategory, string $storeName)
    {
        $searchSearchContext = $this->createSearchContextTransfer($indexName);
        $query = new CategoryProductAbstractKeysQuery($idCategory, $storeName);
        $query->setSearchContext($searchSearchContext);

        return $this->getFactory()->getSearchClient()->search($query);
    }
}
