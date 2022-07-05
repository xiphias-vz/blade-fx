<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider;
use Pyz\Zed\Recommendations\Communication\Form\DataProvider\ScenarioFormDataProvider;
use Pyz\Zed\Recommendations\Communication\Form\DeleteScenarioForm;
use Pyz\Zed\Recommendations\Communication\Form\FfSnippetEnablingForm;
use Pyz\Zed\Recommendations\Communication\Form\RecommendationsEnablingForm;
use Pyz\Zed\Recommendations\Communication\Form\ScenarioForm;
use Pyz\Zed\Recommendations\Communication\Table\ScenariosTable;
use Pyz\Zed\Recommendations\Communication\Transfer\ScenarioFormTransferMapper;
use Pyz\Zed\Recommendations\RecommendationsDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface getFacade()
 * @method \Pyz\Zed\Recommendations\RecommendationsConfig getConfig()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 */
class RecommendationsCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @param \Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider|null $dataProvider
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null $definitionTransfer
     *
     * @return \Symfony\Component\Form\FormInterface
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
     * @param \Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider|null $dataProvider
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null $definitionTransfer
     *
     * @return \Symfony\Component\Form\FormInterface
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
     * @param \Pyz\Zed\Recommendations\Communication\Form\DataProvider\ScenarioFormDataProvider|null $dataProvider
     * @param \Generated\Shared\Transfer\ScenarioTransfer|null $scenarioTransfer
     *
     * @return \Symfony\Component\Form\FormInterface
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
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createDeleteScenarioForm(): FormInterface
    {
        return $this->getFormFactory()->create(DeleteScenarioForm::class);
    }

    /**
     * @param \Pyz\Zed\Recommendations\Communication\Form\DataProvider\ScenarioFormDataProvider|null $dataProvider
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function getScenarioFormData(?ScenarioFormDataProvider $dataProvider = null): ?ScenarioTransfer
    {
        return $dataProvider ? $dataProvider->getData() : $this->createScenarioFormDataProvider()->getData();
    }

    /**
     * @param \Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider|null $dataProvider
     *
     * @return \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null
     */
    public function getDefinitionFormData(?RecommendationFormDataProvider $dataProvider = null): ?RecommendationDefinitionTransfer
    {
        return $dataProvider ? $dataProvider->getData() : $this->createRecommendationDefinitionFormProvider()->getData();
    }

    /**
     * @return \Pyz\Zed\Recommendations\Communication\Transfer\ScenarioFormTransferMapper
     */
    public function createScenarioFormTransferGenerator(): ScenarioFormTransferMapper
    {
        return new ScenarioFormTransferMapper();
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer|null $scenarioTransfer
     *
     * @return \Pyz\Zed\Recommendations\Communication\Form\DataProvider\ScenarioFormDataProvider
     */
    public function createScenarioFormDataProvider(?ScenarioTransfer $scenarioTransfer = null): ScenarioFormDataProvider
    {
        return new ScenarioFormDataProvider(
            $this->getRecommendationsQueryContainer(),
            $this->getRecommendationsFacade(),
            $scenarioTransfer
        );
    }

    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null $definitionTransfer
     *
     * @return \Pyz\Zed\Recommendations\Communication\Form\DataProvider\RecommendationFormDataProvider
     */
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
     * @return \Pyz\Zed\Recommendations\Communication\Table\ScenariosTable
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
