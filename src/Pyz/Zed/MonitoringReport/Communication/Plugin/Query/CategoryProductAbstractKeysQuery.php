<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Plugin\Query;

use Elastica\Query;
use Generated\Shared\Transfer\SearchContextTransfer;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface;
use stdClass;

class CategoryProductAbstractKeysQuery implements QueryInterface, SearchContextAwareQueryInterface
{
    protected const SOURCE_IDENTIFIER = 'page';

    /**
     * @var int
     */
    protected $idCategory;

    /**
     * @var string
     */
    protected $storeName;

    /**
     * @var \Generated\Shared\Transfer\SearchContextTransfer
     */
    protected $searchContextTransfer;

    /**
     * @param int $idCategory
     * @param string $storeName
     */
    public function __construct(int $idCategory, string $storeName)
    {
        $this->idCategory = $idCategory;
        $this->storeName = $storeName;
    }

    /**
     * @return \Elastica\Query
     */
    public function getSearchQuery()
    {
        $queryData = [
            'query' =>
                [
                    'bool' =>
                        [
                            'must' =>
                                [
                                    ['match_all' => new stdClass()],
                                    ['match' => ['type' => 'product_abstract']],
                                    ['match' => ['store' => $this->storeName]],
                                    ['match' => ['is-active' => true]],
                                ],
                            'filter' =>
                                [
                                    [
                            'nested' =>
                                        [
                            "query" =>
                                            [
                            "term" =>
                                                [
                            'integer-facet.facet-name' =>
                                                    [
                            'value' => 'price-DEFAULT-CZK-GROSS_MODE',
                                                        'boost' => 1,
                                                    ],
                                                ],
                                            ],
                                            'path' => 'integer-facet',
                                        ],
                                    ],
                                ],
                        ],
                ],
            'stored_fields' => [],
            'size' => 10000,
        ];

        if ($this->idCategory > 0) {
            $queryData["query"]["bool"]["filter"][1]["term"] =
                                        ['category.all-parents' =>
                                            [
                                                'value' => $this->idCategory,
                                                'boost' => 1,
                                            ],
                                        ];
        }

        return new Query($queryData);
    }

    /**
     * @return \Generated\Shared\Transfer\SearchContextTransfer
     */
    public function getSearchContext(): SearchContextTransfer
    {
        if (!$this->hasSearchContext()) {
            $this->setupDefaultSearchContext();
        }

        return $this->searchContextTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchContextTransfer $searchContextTransfer
     *
     * @return void
     */
    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return void
     */
    protected function setupDefaultSearchContext(): void
    {
        $searchContextTransfer = new SearchContextTransfer();
        $searchContextTransfer->setSourceIdentifier(static::SOURCE_IDENTIFIER);

        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return bool
     */
    protected function hasSearchContext(): bool
    {
        return (bool)$this->searchContextTransfer;
    }
}
