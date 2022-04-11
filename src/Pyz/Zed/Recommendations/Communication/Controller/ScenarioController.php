<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Controller;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Helper\Scenario;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method RecommendationsCommunicationFactory getFactory()
 * @method RecommendationsFacadeInterface getFacade()
 * @method RecommendationsQueryContainerInterface getQueryContainer()
 */
class ScenarioController extends AbstractController
{
    public const REDIRECT_URL_DEFAULT = '/recommendations/scenario';
    public const ID_RECOMMENDATION_SCENARIOS = 'id_recommendation_scenarios';
    public const SCENARIO_ID = 'scenario_id';
    public const ID = 'id';

    /**
     * @param Request $request
     *
     * @return array|RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $definitionDataProvider = $this
            ->getFactory()
            ->createRecommendationDefinitionFormProvider();

        $definitionTransfer = $definitionDataProvider->getData();

        $scenarioTable = $this
            ->getFactory()
            ->createScenariosTable();

        $recommendationsEnablingForm = $this
            ->getFactory()
            ->createRecommendationsEnablingForm($definitionDataProvider, $definitionTransfer)
            ->handleRequest($request);

        $ffSnippetForm = $this
            ->getFactory()
            ->createFfSnippetEnablingForm($definitionDataProvider, $definitionTransfer)
            ->handleRequest($request);

        if ($ffSnippetForm->isSubmitted() && $ffSnippetForm->isValid()) {
            $definitionTransfer = $recommendationsEnablingForm->getData();

            $rowsAffectedAfterUpdate = $this->getFacade()->updateDefinitions($definitionTransfer);
            if ($rowsAffectedAfterUpdate > 0) {
                $this->addSuccessMessage('FactFinder snippet updated successfully!');
            } else {
                $this->addErrorMessage('FactFinder snippet could not be enabled/disabled or you did not make any changes.');
            }
        }

        if ($recommendationsEnablingForm->isSubmitted() && $recommendationsEnablingForm->isValid()) {
            $definitionTransfer = $recommendationsEnablingForm->getData();

            $rowsAffectedAfterUpdate = $this->getFacade()->updateDefinitions($definitionTransfer);
            if ($rowsAffectedAfterUpdate > 0) {
                $this->addSuccessMessage('Recommendations updated successfully!');
            } else {
                $this->addErrorMessage('Recommendations could not be enabled/disabled or you did not make any changes.');
            }
        }

        return $this->viewResponse([
            'scenariosTable' => $scenarioTable->render(),
            'enableRecommendationForm' => $recommendationsEnablingForm->createView(),
            'enableFfSnippetForm' => $ffSnippetForm->createView(),
        ]);
    }

    /**
     * @param Request $request
     *
     * @return array|RedirectResponse
     */
    public function editAction(Request $request)
    {
        $idRecommendationsScenario = $this->castId($request->query->getInt(static::ID));

        $dataProvider = $this
            ->getFactory()
            ->createScenarioFormDataProvider();

        $scenarioTransfer = $dataProvider->getData($idRecommendationsScenario);

        if ($scenarioTransfer === null) {
            $this->addErrorMessage("Scenario with id %d doesn't exist", ['%d' => $idRecommendationsScenario]);

            return $this->redirectResponse(static::REDIRECT_URL_DEFAULT);
        }

        $scenarioForm = $this
            ->getFactory()
            ->createScenarioForm($dataProvider, $scenarioTransfer)
            ->handleRequest($request);

        if ($scenarioForm->isSubmitted() && $scenarioForm->isValid()) {
            $scenarioTransfer = $scenarioForm->getData();
            $scenarioTransfer->setIdRecommendationScenarios($idRecommendationsScenario);

            $rowCount = $this->getQueryContainer()
                ->queryScenariosWithScenarioIdAndHashId(
                    $scenarioTransfer->getScenarioId(),
                    $scenarioTransfer->getHashId()
                )->filterByIdRecommendationScenarios($idRecommendationsScenario)
                ->count();

            if ($rowCount > 0) {
                $this->addErrorMessage('Scenario with provided Scenario Name and Hash ID already exists');
            } else {
                $rowsAffected = $this->getFacade()->updateScenario($scenarioTransfer);
                if ($rowsAffected > 0) {
                    $this->addSuccessMessage('Scenario with id %d was updated successfully.', ['%d' => $idRecommendationsScenario]);
                }
            }
        }

        return $this->viewResponse([
            'form' => $scenarioForm->createView(),
            'scenarioForm' => $scenarioTransfer,
        ]);
    }

    /**
     * @param Request $request
     * @return array|RedirectResponse
     */
    public function createAction(Request $request)
    {
        $scenarioForm = $this
            ->getFactory()
            ->createScenarioForm()
            ->handleRequest($request);

        if ($scenarioForm->isSubmitted() && $scenarioForm->isValid()) {
            if (gettype($scenarioForm->getData()) === 'object') {
                $scenarioTransfer = $scenarioForm->getData();
            } else {
                $scenarioTransfer = $this->getFactory()
                    ->createScenarioFormTransferGenerator()
                    ->createTransfer($scenarioForm);
            }

            $rowCount = $this->getQueryContainer()
                ->queryScenariosWithScenarioIdAndHashId(
                    $scenarioTransfer->getScenarioId(),
                    $scenarioTransfer->getHashId()
                )
                ->count();

            if ($rowCount > 0) {
                $this->addErrorMessage('Scenario with provided scenario ID and hash ID already exists!');
            } else {
                $scenarioTransfer = $this->getFacade()->createScenario($scenarioTransfer);
                if ($scenarioTransfer->getIdRecommendationScenarios()) {
                    $this->addSuccessMessage('Scenario %s was successfully created.', ['%s' => $scenarioTransfer->getScenarioId()]);
                    $redirectUrl = Url::generate('/recommendations/scenario/edit', [static::ID => $scenarioTransfer->getIdRecommendationScenarios()])->build();

                    return $this->redirectResponse($redirectUrl);
                }
            }
        }

        return $this->viewResponse([
            'form' => $scenarioForm->createView(),
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function tableAction(): JsonResponse
    {
        $scenarioTable = $this
            ->getFactory()
            ->createScenariosTable();

        return $this->jsonResponse(
            $scenarioTable->fetchData()
        );
    }
}
