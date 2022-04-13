<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Generated\Shared\Transfer\BasketObjectTransfer;
use Generated\Shared\Transfer\ContextParamTransfer;
use Generated\Shared\Transfer\LeadingObjectTransfer;
use Generated\Shared\Transfer\RecommendationsApiTransfer;
use Generated\Shared\Transfer\ResultObjectTransfer;
use Generated\Shared\Transfer\ScenarioHashTransfer;
use Generated\Shared\Transfer\ScenariosApiTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;
use Spryker\Service\UtilEncoding\Model\Json;

class GlobusRestApiRecommendations
{
    public const USER_TYPE = 'GIGYA_ID';
    public const SCENARIO_ID = 'GLOBUS_UAT_SZENARIO';

    protected const SCENARIO_HASH_ARRAY_NAME = 'ScenarioHashes';
    protected const CONTEXT_PARAMS_ARRAY_NAME = 'ContextParams';
    protected const RESULT_OBJECT_ARRAY_NAME = 'ResultObjects';
    protected const SCENARIOS_ARRAY_NAME = 'Scenarios';

    /**
     * @var \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    private $recommendation;

    /**
     * @var \Generated\Shared\Transfer\ScenariosApiTransfer
     */
    private $scenario;

    /**
     * @var string
     */
    private $bearerToken;

    /**
     * @param string $userId
     * @param bool $externalTracking
     * @param string $bearerToken
     *
     * @return \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    public function createRecommendation(
        string $userId,
        bool $externalTracking,
        string $bearerToken
    ): RecommendationsApiTransfer {
        $this->recommendation = new RecommendationsApiTransfer();
        $this->recommendation->setUserId($userId);
        $this->recommendation->setUserType(static::USER_TYPE);
        $this->recommendation->setExternalTracking($externalTracking);

        $this->bearerToken = $bearerToken;

        return $this->recommendation;
    }

    /**
     * @param string $scenarioId
     * @param string $hashId
     *
     * @return \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    public function createScenario(
        string $scenarioId,
        string $hashId
    ): RecommendationsApiTransfer {
        $this->scenario = new ScenariosApiTransfer();
        $this->scenario->setScenarioId($scenarioId);
        $this->scenario->setHashId($hashId);

        return $this->recommendation;
    }

    /**
     * @return void
     */
    public function addScenario()
    {
        $this->recommendation->addScenarios($this->scenario);
    }

    /**
     * @param string $scenarioId
     * @param string $contextParamId
     *
     * @return \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    public function addContextParam(
        string $scenarioId,
        string $contextParamId
    ): RecommendationsApiTransfer {
        $context = new ContextParamTransfer();
        $context->setScenarioId($scenarioId);
        $context->setContextParamId($contextParamId);

        $this->recommendation->addContextParams($context);

        return $this->recommendation;
    }

    /**
     * @param string $scenarioId
     * @param string $hashId
     * @param string $expiresOn
     * @param string $resultScope
     *
     * @return \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    public function addScenarioHash(
        string $scenarioId,
        string $hashId,
        string $expiresOn,
        string $resultScope
    ): RecommendationsApiTransfer {
        $scenarioHash = new ScenarioHashTransfer();
        $scenarioHash->setScenarioId($scenarioId);
        $scenarioHash->setHashId($hashId);
        $scenarioHash->setExpiresOn($expiresOn);
        $scenarioHash->setResultScope($resultScope);

        $this->recommendation->addScenarioHashes($scenarioHash);

        return $this->recommendation;
    }

    /**
     * @param string $scenarioId
     * @param string $resultObjectType
     * @param string $resultObjectId
     * @param string $resultObjectScore
     *
     * @return \Generated\Shared\Transfer\RecommendationsApiTransfer
     */
    public function addResultObject(
        string $scenarioId,
        string $resultObjectType,
        string $resultObjectId,
        string $resultObjectScore
    ): RecommendationsApiTransfer {
        $resultObject = new ResultObjectTransfer();
        $resultObject->setScenarioId($scenarioId);
        $resultObject->setResultObjectType($resultObjectType);
        $resultObject->setResultObjectId($resultObjectId);
        $resultObject->setResultObjectScore($resultObjectScore);

        $this->recommendation->addResultObjects($resultObject);

        return $this->recommendation;
    }

    /**
     * @param string $leadingObjectId
     * @param string $leadingObjectType
     *
     * @return \Generated\Shared\Transfer\ScenariosApiTransfer
     */
    public function addLeadingObject(
        string $leadingObjectId,
        string $leadingObjectType
    ): ScenariosApiTransfer {
        $leadingObject = new LeadingObjectTransfer();
        $leadingObject->setLeadingObjectId($leadingObjectId);
        $leadingObject->setLeadingObjectType($leadingObjectType);

        $this->scenario->addLeadingObjects($leadingObject);

        return $this->scenario;
    }

    /**
     * @param string $basketObjectId
     * @param string $basketObjectType
     *
     * @return \Generated\Shared\Transfer\ScenariosApiTransfer
     */
    public function addBasketObject(
        string $basketObjectId,
        string $basketObjectType
    ): ScenariosApiTransfer {
        $basketObject = new BasketObjectTransfer();
        $basketObject->setBasketObjectId($basketObjectId);
        $basketObject->setBasketObjectType($basketObjectType);

        $this->scenario->addBasketObjects($basketObject);

        return $this->scenario;
    }

    /**
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public function postRecommendations(): GlobusRestApiResult
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_RECOMMENDATIONS);
        $jsonUtil = new Json();
        $dataArray = $this->recommendation->modifiedToArray(true, true);

        $arrayKeys = array_keys($dataArray);
        $arrayMap = array_map('ucfirst', $arrayKeys);
        $arrayCombine = array_combine($arrayMap, $dataArray);

        foreach ($arrayCombine as $key => $value) {
            if (is_array($value)) {
                $arrayCombine[$key] = $this->makeKeysPascalCase($value);

                $lengthOfInnerArray = count($value);
                for ($i = 0; $i < $lengthOfInnerArray; $i++) {
                    foreach ($value[$i] as $childKey => $childValue) {
                        if (is_array($childValue)) {
                            $arrayCombine[$key][$i][ucfirst($childKey)] = $this->makeKeysPascalCase($childValue);
                        }
                    }
                }
            }
        }

        $requiredRequestArrays = [
            static::SCENARIOS_ARRAY_NAME,
            static::CONTEXT_PARAMS_ARRAY_NAME,
            static::SCENARIO_HASH_ARRAY_NAME,
            static::RESULT_OBJECT_ARRAY_NAME,
        ];
        foreach ($requiredRequestArrays as $key) {
            if (!array_key_exists($key, $arrayCombine)) {
                $arrayToAdd = [];
                $arrayCombine[$key] = $arrayToAdd;
            }
        }

        $data = $jsonUtil->encode($arrayCombine);

        return GlobusRestApiClient::post($url, $data, [], $this->bearerToken);
    }

    /**
     * @param array $array
     *
     * @return array
     */
    protected function makeKeysPascalCase(array $array): array
    {
        $lengthOfArray = count($array);
        for ($i = 0; $i < $lengthOfArray; $i++) {
            $arrayKeys = array_keys($array[$i]);
            $arrayMap = array_map('ucfirst', $arrayKeys);
            $arrayCombine = array_combine($arrayMap, $array[$i]);
            $array[$i] = $arrayCombine;
        }

        return $array;
    }
}
