<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Elastica\JSON;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Customer\Persistence\SpyCustomer;
use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;
use PDO;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsPersistenceFactory getFactory()
 */
class RecommendationsQueryContainer extends AbstractQueryContainer implements RecommendationsQueryContainerInterface
{
    protected const RESULT_OBJECT_ID = 'ResultObjectId';
    protected const RESULT_OBJECT_TYPE = 'ResultObjectType';
    protected const RESULT_OBJECT_TYPE_NAME = 'SAP_ERP_MATNR';

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        $parsedResult = JSON::parse($recoTransfer->getApiResult());
        $resultObjects = $parsedResult['ResultObjects']['results'] ?? [];

        $isInserted = false;
        if (count($resultObjects) > 0) {
            $isInserted = $this->insertRecoDataToDatabase($resultObjects, $recoTransfer, $customerEntity);
        }

        if ($isInserted) {
            $this->filterResultObjects($recoTransfer, $customerEntity);
        }

        $recoTransfer->setIsInserted($isInserted);

        return $recoTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        if ($customerEntity == false) {
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
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     * @param \Orm\Zed\Customer\Persistence\SpyCustomer $customerEntity
     *
     * @return bool
     */
    protected function insertRecoDataToDatabase(array $resultObjects, RecoTransfer $recoTransfer, SpyCustomer $customerEntity): bool
    {
        $resultObjectsIds = [];
        foreach ($resultObjects as $productEans) {
            if (isset($productEans[static::RESULT_OBJECT_ID])
                && isset($productEans[static::RESULT_OBJECT_TYPE])
                && $productEans[static::RESULT_OBJECT_TYPE] === self::RESULT_OBJECT_TYPE_NAME
            ) {
                $resultObjectsIds[] = $productEans[static::RESULT_OBJECT_ID];
            }
        }

        $dataToInsert = [
            'ResultObjectId' => $resultObjectsIds,
        ];

        $resultObjectsString = JSON::stringify($dataToInsert);
        $customerEntity->setReco($resultObjectsString);
        $customerEntity->save();

        $recoTransfer->setData($resultObjectsString);

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     * @param \Orm\Zed\Customer\Persistence\SpyCustomer $customerEntity
     *
     * @return void
     */
    protected function filterResultObjects(RecoTransfer $recoTransfer, SpyCustomer $customerEntity): void
    {
        $selectSql = $this->callProcedureForFilteringAvailableSkus($customerEntity->getIdCustomer());

        $result = $this->getResult($selectSql);
        $resultString = '';
        if (isset($result[0]['reco_available'])) {
            $resultString = $result[0]['reco_available'];
        }

        $recoTransfer->setData($resultString);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        $customerEntity = $this->getCustomerEntity($recoTransfer);

        if ($customerEntity == false) {
            $recoTransfer->setIsInserted(false);

            return $recoTransfer;
        }

        $recoTransfer->setData($customerEntity->getReco());

        return $recoTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        $scenarioEntity = $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByActive(true)
            ->findOne();

        $mapper = $this->getFactory()->createScenarioMapper();

        $mapper->mapScenarioEntityToScenarioTransfer($scenarioEntity, $scenarioTransfer);

        return $scenarioTransfer;
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function getPyzRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()->createPyzRecommendationsScenariosQuery();
    }

    /**
     * @return \Orm\Zed\Customer\Persistence\SpyCustomerQuery
     */
    public function getSpyCustomerQuery(): SpyCustomerQuery
    {
        return $this->getFactory()->createSpyCustomerQuery();
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Orm\Zed\Customer\Persistence\SpyCustomer
     */
    protected function getCustomerEntity(RecoTransfer $recoTransfer): SpyCustomer
    {
        $customer = $recoTransfer->getCustomer();

        return $this->getFactory()
            ->createSpyCustomerQuery()
            ->filterByIdCustomer($customer->getIdCustomer())
            ->findOne();
    }

    /**
     * @return int[]
     */
    public function getRedisKeys(): array
    {
        return [
            'recommendations_enabed' => 1,
        ];
    }

    /**
     * @param string $scenarioId
     * @param string $hashId
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithScenarioIdAndHashId(string $scenarioId, string $hashId): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByHashId($hashId)
            ->filterByScenarioId($scenarioId);
    }

    /**
     * @param string $scenarioId
     * @param bool $isActive
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithScenarioIdAndActiveField(string $scenarioId, bool $isActive): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByActive($isActive)
            ->filterByScenarioId($scenarioId);
    }

    /**
     * @param string $scenarioId
     * @param bool $isActive
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithNotEqualScenarioIdAndActiveField(string $scenarioId, bool $isActive): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByActive($isActive)
            ->filterByIdRecommendationScenarios($scenarioId, Criteria::NOT_EQUAL);
    }

    /**
     * @param int $id
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithIdRecommendationScenarios(int $id): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByIdRecommendationScenarios($id);
    }

    /**
     * @param int $id
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithNotEqualIdRecommendationScenarios(int $id): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->filterByIdRecommendationScenarios($id, Criteria::NOT_EQUAL);
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryAllScenarios(): PyzRecommendationScenariosQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsScenariosQuery();
    }

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery
     */
    public function queryDefinitions(): PyzRecommendationDefinitionQuery
    {
        return $this->getFactory()
            ->createPyzRecommendationsDefinitionQuery();
    }

    /**
     * @param string $customerReference
     *
     * @return string
     */
    protected function callProcedureForFilteringAvailableSkus(string $customerReference): string
    {
        return "call pyzx_check_product_availability_for_recommendations(" . $customerReference . ")";
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    protected function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
}
