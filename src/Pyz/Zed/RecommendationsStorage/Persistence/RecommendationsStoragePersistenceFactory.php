<?php

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationsStorageQuery;
use Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper\RecommendationsStorageMapper;
use Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper\RecommendationsStorageMapperInterface;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageDependencyProvider;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 */
class RecommendationsStoragePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return PyzRecommendationScenariosQuery
     */
    public function createRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery
    {
        return PyzRecommendationScenariosQuery::create();
    }

    /**
     * @return PyzRecommendationDefinitionQuery
     */
    public function createRecommendationDefinitionQuery(): PyzRecommendationDefinitionQuery
    {
        return PyzRecommendationDefinitionQuery::create();
    }

    /**
     * @return PyzRecommendationDefinitionStorageQuery
     */
    public function createRecommendationDefinitionStorageQuery(): PyzRecommendationDefinitionStorageQuery
    {
        return PyzRecommendationDefinitionStorageQuery::create();
    }

    /**
     * @param $store
     *
     * @return PyzRecommendationDefinitionStorageQuery
     */
    public function queryRecommendationDefinitionStorageByStore($store): PyzRecommendationDefinitionStorageQuery
    {
        return PyzRecommendationDefinitionStorageQuery::create()
            ->filterByStore($store);
    }

    /**
     * @return RecommendationsStorageMapperInterface
     */
    public function createRecommendationsStorageMapper(): RecommendationsStorageMapperInterface
    {
        return new RecommendationsStorageMapper();
    }
}
