<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business;

use Pyz\Zed\Recommendations\Business\Model\DefinitionReader;
use Pyz\Zed\Recommendations\Business\Model\DefinitionWriter;
use Pyz\Zed\Recommendations\Business\Model\DefinitionWriterInterface;
use Pyz\Zed\Recommendations\Business\Model\RecoWriter;
use Pyz\Zed\Recommendations\Business\Model\RecoWriterInterface;
use Pyz\Zed\Recommendations\Business\Model\ScenarioReader;
use Pyz\Zed\Recommendations\Business\Model\ScenarioReaderInterface;
use Pyz\Zed\Recommendations\Business\Model\ScenarioWriter;
use Pyz\Zed\Recommendations\Business\Model\ScenarioWriterInterface;
use Pyz\Zed\Recommendations\RecommendationsDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Recommendations\RecommendationsConfig getConfig()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 */
class RecommendationsBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\Recommendations\Business\Model\RecoWriterInterface
     */
    public function createRecoWriter(): RecoWriterInterface
    {
        return new RecoWriter(
            $this->getQueryContainer()
        );
    }

    /**
     * @return \Pyz\Zed\Recommendations\Business\Model\ScenarioWriterInterface
     */
    public function createScenarioWriter(): ScenarioWriterInterface
    {
        return new ScenarioWriter(
            $this->getQueryContainer()
        );
    }

    /**
     * @return \Pyz\Zed\Recommendations\Business\Model\ScenarioReaderInterface
     */
    public function createScenarioReader(): ScenarioReaderInterface
    {
        return new ScenarioReader(
            $this->getQueryContainer(),
            $this->getRepository()
        );
    }

    /**
     * @return \Pyz\Zed\Recommendations\Business\Model\DefinitionReader
     */
    public function createDefinitionReader(): DefinitionReader
    {
        return new DefinitionReader(
            $this->getRepository()
        );
    }

    /**
     * @return \Pyz\Zed\Recommendations\Business\Model\DefinitionWriterInterface
     */
    public function createDefinitionWriter(): DefinitionWriterInterface
    {
        return new DefinitionWriter(
            $this->getQueryContainer(),
            $this->getEventFacade(),
            $this->getStoreFacade()
        );
    }

    /**
     * @return mixed
     */
    public function getEventFacade()
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::EVENT_FACADE);
    }

    /**
     * @return mixed
     */
    public function getStoreFacade()
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::STORE_FACADE);
    }
}
