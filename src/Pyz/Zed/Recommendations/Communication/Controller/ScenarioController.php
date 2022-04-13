<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Controller;

use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface getFacade()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 */
class ScenarioController extends AbstractController
{
    public const REDIRECT_URL_DEFAULT = '/recommendations/scenario';
    public const ID_RECOMMENDATION_SCENARIOS = 'id_recommendation_scenarios';
    public const SCENARIO_ID = 'scenario_id';
    public const ID = 'id';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
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
                ->queryScenariosWithScenarioIdAndActiveField(
                    $scenarioTransfer->getScenarioId(),
                    $scenarioTransfer->getActive()
                )->filterByIdRecommendationScenarios($idRecommendationsScenario)
                ->count();

            $rowCountForActiveScenarios = 1;

            if (!$scenarioTransfer->getActive()) {
                $rowCountForActiveScenarios = $this->getQueryContainer()
                    ->queryScenariosWithNotEqualScenarioIdAndActiveField($idRecommendationsScenario, true)
                    ->count();
            }

            if ($rowCount > 0) {
                $this->addErrorMessage('Scenario with provided Scenario Name and Hash ID already exists or you did not make any changes');
            } elseif ($rowCountForActiveScenarios == 0) {
                $this->addErrorMessage('At least one scenario must be ACTIVE');
                $redirectUrl = Url::generate('/recommendations/scenario/edit', [static::ID => $scenarioTransfer->getIdRecommendationScenarios()])->build();

                return $this->redirectResponse($redirectUrl);
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
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
                ->queryScenariosWithScenarioIdAndActiveField(
                    $scenarioTransfer->getScenarioId(),
                    $scenarioTransfer->getActive()
                )
                ->count();

            $rowCountForActiveScenarios = 1;

            if (!$scenarioTransfer->getActive()) {
                $rowCountForActiveScenarios = $this->getQueryContainer()
                    ->queryScenariosWithNotEqualScenarioIdAndActiveField($scenarioTransfer->getScenarioId(), true)
                    ->count();
            }

            if ($rowCount > 0) {
                $this->addErrorMessage('Scenario with provided scenario ID and hash ID already exists!');
            } elseif ($rowCountForActiveScenarios == 0) {
                $this->addErrorMessage('At least one scenario must be ACTIVE');
                $redirectUrl = Url::generate('/recommendations/scenario/create')->build();

                return $this->redirectResponse($redirectUrl);
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
     * @return \Symfony\Component\HttpFoundation\JsonResponse
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
