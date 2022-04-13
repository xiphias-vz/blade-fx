<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;
use Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper\RecommendationsStorageMapper;
use Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper\RecommendationsStorageMapperInterface;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsStoragePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function createRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery
    {
        return PyzRecommendationScenariosQuery::create();
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery
     */
    public function createRecommendationDefinitionQuery(): PyzRecommendationDefinitionQuery
    {
        return PyzRecommendationDefinitionQuery::create();
    }

    /**
     * @return \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery
     */
    public function createRecommendationDefinitionStorageQuery(): PyzRecommendationDefinitionStorageQuery
    {
        return PyzRecommendationDefinitionStorageQuery::create();
    }

    /**
     * @param string $store
     *
     * @return \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery
     */
    public function queryRecommendationDefinitionStorageByStore(string $store): PyzRecommendationDefinitionStorageQuery
    {
        return PyzRecommendationDefinitionStorageQuery::create()
            ->filterByStore($store);
    }

    /**
     * @return \Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper\RecommendationsStorageMapperInterface
     */
    public function createRecommendationsStorageMapper(): RecommendationsStorageMapperInterface
    {
        return new RecommendationsStorageMapper();
    }
}
