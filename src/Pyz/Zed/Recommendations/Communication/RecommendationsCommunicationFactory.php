<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider;
use Pyz\Zed\Recommendations\Communication\Form\DataProvider\ScenarioFormDataProvider;
use Pyz\Zed\Recommendations\Communication\Form\DeleteScenarioForm;
use Pyz\Zed\Recommendations\Communication\Form\FfSnippetEnablingForm;
use Pyz\Zed\Recommendations\Communication\Form\ScenarioForm;
use Pyz\Zed\Recommendations\Communication\Form\RecommendationsEnablingForm;
use Pyz\Zed\Recommendations\Communication\Table\ScenariosTable;
use Pyz\Zed\Recommendations\Communication\Transfer\ScenarioFormTransferMapper;
use Pyz\Zed\Recommendations\RecommendationsDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

class RecommendationsCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @param RecommendationFormDataProvider|null $dataProvider
     * @param RecommendationDefinitionTransfer|null $definitionTransfer
     *
     * @return FormInterface
     */
    public function createFfSnippetEnablingForm(?RecommendationFormDataProvider $dataProvider = null, ?RecommendationDefinitionTransfer $definitionTransfer = null): FormInterface
    {
        return $this->getFormFactory()->create(
            FfSnippetEnablingForm::class,
            $definitionTransfer ?: $this->getDefinitionFormData(),
            [
                'data_class' => RecommendationDefinitionTransfer::class,
            ]
        );
    }

    /**
     * @param RecommendationFormDataProvider|null $dataProvider
     * @param RecommendationDefinitionTransfer|null $definitionTransfer
     *
     * @return FormInterface
     */
    public function createRecommendationsEnablingForm(?RecommendationFormDataProvider $dataProvider = null, ?RecommendationDefinitionTransfer $definitionTransfer = null): FormInterface
    {
        return $this->getFormFactory()->create(
            RecommendationsEnablingForm::class,
            $definitionTransfer ?: $this->getDefinitionFormData(),
            [
                'data_class' => RecommendationDefinitionTransfer::class,
            ]
        );
    }

    /**
     * @param ScenarioFormDataProvider|null $dataProvider
     * @param ScenarioTransfer|null $scenarioTransfer
     *
     * @return FormInterface
     */
    public function createScenarioForm(?ScenarioFormDataProvider $dataProvider = null, ?ScenarioTransfer $scenarioTransfer = null): FormInterface
    {
        return $this->getFormFactory()->create(
            ScenarioForm::class,
            $scenarioTransfer ?: $this->getScenarioFormData(),
            [
                'data_class' => ScenarioTransfer::class,
            ]
        );
    }

    /**
     * @return FormInterface
     */
    public function createDeleteScenarioForm(): FormInterface
    {
        return $this->getFormFactory()->create(DeleteScenarioForm::class);
    }

    /**
     * @param ScenarioFormDataProvider|null $dataProvider
     *
     * @return ScenarioTransfer|null
     */
    public function getScenarioFormData(?ScenarioFormDataProvider $dataProvider = null): ?ScenarioTransfer
    {
        return $dataProvider ? $dataProvider->getData() : $this->createScenarioFormDataProvider()->getData();
    }

    /**
     * @param RecommendationFormDataProvider|null $dataProvider
     *
     * @return RecommendationDefinitionTransfer|null
     */
    public function getDefinitionFormData(?RecommendationFormDataProvider $dataProvider = null): ?RecommendationDefinitionTransfer
    {
        return $dataProvider ? $dataProvider->getData() : $this->createRecommendationDefinitionFormProvider()->getData();
    }

    /**
     * @return ScenarioFormTransferMapper
     */
    public function createScenarioFormTransferGenerator(): ScenarioFormTransferMapper
    {
        return new ScenarioFormTransferMapper();
    }

    /**
     * @param ScenarioTransfer|null $scenarioTransfer
     *
     * @return ScenarioFormDataProvider
     */
    public function createScenarioFormDataProvider(?ScenarioTransfer $scenarioTransfer = null): ScenarioFormDataProvider
    {
        return new ScenarioFormDataProvider(
            $this->getRecommendationsQueryContainer(),
            $this->getRecommendationsFacade(),
            $scenarioTransfer
        );
    }

    public function createRecommendationDefinitionFormProvider(?RecommendationDefinitionTransfer $definitionTransfer = null): RecommendationFormDataProvider
    {
        return new RecommendationFormDataProvider(
            $this->getRecommendationsFacade(),
            $definitionTransfer
        );
    }

    /**
     * @return mixed
     */
    public function getRecommendationsFacade()
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::RECOMMENDATIONS_FACADE);
    }

    /**
     * @return ScenariosTable
     */
    public function createScenariosTable(): ScenariosTable
    {
        return new ScenariosTable(
            $this->getRecommendationsQueryContainer()
        );
    }

    /**
     * @return mixed
     */
    public function getRecommendationsQueryContainer()
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::QUERY_CONTAINER_RECOMMENDATIONS);
    }
}
