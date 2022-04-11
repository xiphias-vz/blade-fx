<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Controller;

use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Spryker\Service\UtilText\Model\Url\Url;

/**
 * @method RecommendationsCommunicationFactory getFactory()
 * @method RecommendationsFacadeInterface getFacade()
 * @method RecommendationsQueryContainerInterface getQueryContainer()
 */
class DeleteScenarioController extends AbstractController
{
    protected const PARAM_REQUEST_ID = 'id';
    protected const PARAM_TEMPLATE_ID = 'idRecommendationScenarios';

    protected const DELETE_SCENARIO_FORM = 'deleteScenarioForm';

    /**
     * @param Request $request
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
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function confirmAction(Request $request): RedirectResponse
    {
        $deleteScenarioFrom = $this->getFactory()
            ->createDeleteScenarioForm()
            ->handleRequest($request);

        if(!$deleteScenarioFrom->isSubmitted() || !$deleteScenarioFrom->isValid()) {
            $this->addErrorMessage("CSRF token is not valid.");

            return $this->redirectResponse(Url::generate('/recommendations/scenario')->build());
        }

        $idRecommendationScenarios = $this->castId($request->query->getInt(static::PARAM_REQUEST_ID));

        $this->getFacade()
            ->deleteScenario($idRecommendationScenarios);

        $this->addSuccessMessage('Scenario with id %d was deleted successfully.', ['%d' => $idRecommendationScenarios]);

        return $this->redirectResponse(Url::generate('/recommendations/scenario')->build());
    }
}
