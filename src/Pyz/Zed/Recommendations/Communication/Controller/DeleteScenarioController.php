<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Controller;

use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface getFacade()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 */
class DeleteScenarioController extends AbstractController
{
    protected const PARAM_REQUEST_ID = 'id';
    protected const PARAM_TEMPLATE_ID = 'idRecommendationScenarios';

    protected const DELETE_SCENARIO_FORM = 'deleteScenarioForm';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request): array
    {
        $idRecommendationScenario = $this->castId($request->query->get(static::PARAM_REQUEST_ID));

        $deleteScenarioForm = $this->getFactory()
            ->createDeleteScenarioForm()
            ->createView();

        return $this->viewResponse([
            static::PARAM_TEMPLATE_ID => $idRecommendationScenario,
            static::DELETE_SCENARIO_FORM => $deleteScenarioForm,
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmAction(Request $request): RedirectResponse
    {
        $deleteScenarioFrom = $this->getFactory()
            ->createDeleteScenarioForm()
            ->handleRequest($request);

        if (!$deleteScenarioFrom->isSubmitted() || !$deleteScenarioFrom->isValid()) {
            $this->addErrorMessage("CSRF token is not valid.");

            return $this->redirectResponse(Url::generate('/recommendations/scenario')->build());
        }

        $idRecommendationScenarios = $this->castId($request->query->getInt(static::PARAM_REQUEST_ID));

        $rowCount = $this->getQueryContainer()
            ->queryScenarioWithNotEqualIdRecommendationScenarios($idRecommendationScenarios)
            ->count();

        if ($rowCount > 0) {
            $this->getFacade()
                ->deleteScenario($idRecommendationScenarios);

            $this->addSuccessMessage('Scenario with id %d was deleted successfully.', ['%d' => $idRecommendationScenarios]);

            // return $this->redirectResponse(Url::generate('/recommendations/scenario')->build());
        } else {
            $this->addErrorMessage('At least one Scenario has to be in Database');
        }

        return $this->redirectResponse(Url::generate('/recommendations/scenario')->build());
    }
}
