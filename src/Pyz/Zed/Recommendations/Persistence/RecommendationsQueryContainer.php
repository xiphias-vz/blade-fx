<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Elastica\JSON;
use Generated\Shared\Transfer\RecoTransfer;
use Orm\Zed\Customer\Persistence\SpyCustomer;
use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method RecommendationsPersistenceFactory getFactory()
 */
class RecommendationsQueryContainer extends AbstractQueryContainer implements RecommendationsQueryContainerInterface
{
    protected const RESULT_OBJECT_ID = 'ResultObjectId';
    protected const RESULT_OBJECT_TYPE = 'ResultObjectType';
    protected const RESULT_OBJECT_TYPE_NAME = 'SAP_ERP_MATNR';

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $parsedResult = JSON::parse($recoTransfer->getApiResult());
        $resultObjects = $parsedResult['ResultObjects']['results'] ?? array();
        $isInserted = false;
        if (count($resultObjects) > 0) {
            $isInserted = $this->insertRecoDataToDatabase($resultObjects, $recoTransfer);
        }

        $recoTransfer->setIsInserted($isInserted);

        /*$query = SpyCustomerQuery::create();
        $query->select('reco')
            ->addAsColumn('reco', 'spy_customer.reco')
            ->where("spy_customer.id_customer =" . $customer->getIdCustomer())
            ->find()
            ->toArray();*/

        return $recoTransfer;
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        if (!$customerEntity) {
            $recoTransfer->setIsDeleted(false);
            return $recoTransfer;
        }

        $customerEntity->setReco('');
        $customerEntity->save();

        $recoTransfer->setIsDeleted(true);

        return $recoTransfer;
    }

    /**
     * @param array $resultObjects
     * @param RecoTransfer $recoTransfer
     *
     * @return bool
     */
    protected function insertRecoDataToDatabase(array $resultObjects, RecoTransfer $recoTransfer): bool
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        if(!$customerEntity) {
            return false;
        }

        $resultObjectsIds = array();
        foreach($resultObjects as $productEans) {
            if (isset($productEans[static::RESULT_OBJECT_ID])
                && isset($productEans[static::RESULT_OBJECT_TYPE])
                && $productEans[static::RESULT_OBJECT_TYPE] === self::RESULT_OBJECT_TYPE_NAME
            ) {
                $resultObjectsIds[] = $productEans[static::RESULT_OBJECT_ID];
            }
        }

        $dataToInsert = array(
            'ResultObjectId' => $resultObjectsIds
        );

        $resultObjectsString = JSON::stringify($dataToInsert);
        $customerEntity->setReco($resultObjectsString);
        $customerEntity->save();

        $recoTransfer->setData($resultObjectsString);

        return true;
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        if (!$customerEntity) {
            $recoTransfer->setIsInserted(false);

            return $recoTransfer;
        }

        $recoTransfer->setData($customerEntity->getReco());

        return $recoTransfer;
    }

    /**
     * @return PyzRecommendationScenariosQuery
     */
    public function getPyzRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()->createPyzRecommendationsScenariosQuery();
    }

    /**
     * @return SpyCustomerQuery
     */
    public function getSpyCustomerQuery(): SpyCustomerQuery
    {
        return $this->getFactory()->createSpyCustomerQuery();
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return SpyCustomer
     */
    protected function getCustomerEntity(RecoTransfer $recoTransfer): SpyCustomer
    {
        $customer = $recoTransfer->getCustomer();

        return $this->getFactory()
            ->createSpyCustomerQuery()
            ->filterByIdCustomer($customer->getIdCustomer())
            ->findOne();
    }




    public function getRedisKeys(): array
    {
        return array(
            'recommendations_enabed' => 1
        );
    }

    /**
     * @param string $scenarioId
     * @param string $hashId
     * @return PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithScenarioIdAndHashId(string $scenarioId, string $hashId): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByHashId($hashId)
            ->filterByScenarioId($scenarioId);
    }

    /**
     * @param $id
     *
     * @return PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithIdRecommendationScenarios($id): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByIdRecommendationScenarios($id);
    }

    /**
     * @return PyzRecommendationScenariosQuery
     */
    public function queryAllScenarios(): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery();
    }

    /**
     * @return PyzRecommendationDefinitionQuery
     */
    public function queryDefinitions(): PyzRecommendationDefinitionQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsDefinitionQuery();
    }
}
