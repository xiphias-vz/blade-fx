<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;
use Pyz\Zed\Recommendations\Persistence\Propel\Mapper\ScenarioMapper;
use Pyz\Zed\Recommendations\Persistence\Propel\Mapper\ScenarioMapperInterface;
use Pyz\Zed\Recommendations\RecommendationsDependencyProvider;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;
use SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientInterface;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 * @method \Pyz\Zed\Recommendations\RecommendationsConfig getConfig()
 */
class RecommendationsPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Customer\Persistence\SpyCustomerQuery
     */
    public function createSpyCustomerQuery(): SpyCustomerQuery
    {
        return SpyCustomerQuery::create();
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function createPyzRecommendationsScenariosQuery(): PyzRecommendationScenariosQuery
    {
        return PyzRecommendationScenariosQuery::create();
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery
     */
    public function createPyzRecommendationsDefinitionQuery(): PyzRecommendationDefinitionQuery
    {
        return PyzRecommendationDefinitionQuery::create();
    }

    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function createSpyMerchantQuery(): SpyMerchantQuery
    {
        return SpyMerchantQuery::create();
    }

    /**
     * @return \Pyz\Zed\Recommendations\Persistence\Propel\Mapper\ScenarioMapperInterface
     */
    public function createScenarioMapper(): ScenarioMapperInterface
    {
        return new ScenarioMapper();
    }

    /**
     * @return mixed
     */
    public function getCustomerClient(): CustomerPageToCustomerClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CUSTOMER_CLIENT);
    }
}
