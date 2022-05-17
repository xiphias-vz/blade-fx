<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Plugin\Category;

use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\Term;
use Generated\Shared\Search\PageIndexMap;
use Generated\Shared\Transfer\ElasticsearchSearchContextTransfer;
use Generated\Shared\Transfer\SearchContextTransfer;
use InvalidArgumentException;
use Pyz\Shared\PropelExtension\PropelExtension;
use Pyz\Zed\MonitoringReport\Communication\Console\CategoryCheckConsole;
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
        $data = $this->getRepository()->getCategoryMonitoringData();
        /**@var \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories $item */
        foreach ($data as $item) {
            if ($item->getCategoryName() != self::NO_CATEGORY) {
                $indexNme = $this->getIndexName($item->getStoreName());
                $res = $this->getSearchResult($indexNme, $item->getFkCategory());
                $hits = $res->getTotalHits();
                $item->setNumberOfProductsSearch($hits);
                $item->save();
            }
        }
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
                $this->getRepository()->setEmailToSend(CategoryCheckConsole::COMMAND_DESCRIPTION, $mail, '', $content);
            }
        }
    }

    /**
     * @return string
     */
    protected function getMailContent(): string
    {
        $data = $this->getRepository()->getCategoryMonitoringData();
        /**@var \Orm\Zed\MonitoringReport\Persistence\PyzMonitorCategories $item */
        $content = "store;category;url;products_db;products_search";
        foreach ($data as $item) {
            if ($item->getNumberOfProductsDb() !== $item->getNumberOfProductsSearch()) {
                $content .= PHP_EOL;
                $content .= sprintf(
                    '%s;%s;%s;%d;%d',
                    $item->getStoreName(),
                    $item->getCategoryName(),
                    $item->getCategoryUrl(),
                    $item->getNumberOfProductsDb(),
                    $item->getNumberOfProductsSearch()
                );
            }
        }

        return $content;
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
}
