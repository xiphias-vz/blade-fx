<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
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
use SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientBridge;
use SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientInterface;

/**
 * @method RecommendationsQueryContainerInterface getQueryContainer()
 */
class RecommendationsPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return SpyCustomerQuery
     */
    public function createSpyCustomerQuery(): SpyCustomerQuery
    {
        return SpyCustomerQuery::create();
    }

    /**
     * @return PyzRecommendationScenariosQuery
     */
    public function createPyzRecommendationsScenariosQuery(): PyzRecommendationScenariosQuery
    {
        return PyzRecommendationScenariosQuery::create();
    }

    /**
     * @return PyzRecommendationDefinitionQuery
     */
    public function createPyzRecommendationsDefinitionQuery(): PyzRecommendationDefinitionQuery
    {
        return PyzRecommendationDefinitionQuery::create();
    }

    /**
     * @return SpyMerchantQuery
     */
    public function createSpyMerchantQuery(): SpyMerchantQuery
    {
        return SpyMerchantQuery::create();
    }

    /**
     * @return ScenarioMapperInterface
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
