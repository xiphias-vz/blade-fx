<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business;

use Pyz\Zed\Recommendations\Business\Model\DefinitionReader;
use Pyz\Zed\Recommendations\Business\Model\DefinitionWriter;
use Pyz\Zed\Recommendations\Business\Model\DefinitionWriterInterface;
use Pyz\Zed\Recommendations\Business\Model\RecoWriter;
use Pyz\Zed\Recommendations\Business\Model\ScenarioReader;
use Pyz\Zed\Recommendations\Business\Model\ScenarioReaderInterface;
use Pyz\Zed\Recommendations\Business\Model\ScenarioWriter;
use Pyz\Zed\Recommendations\Business\Model\ScenarioWriterInterface;
use Pyz\Zed\Recommendations\Business\Model\RecoWriterInterface;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface;
use Pyz\Zed\Recommendations\RecommendationsConfig;
use Pyz\Zed\Recommendations\RecommendationsDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method RecommendationsQueryContainerInterface getQueryContainer()
 * @method RecommendationsConfig getConfig()
 * @method RecommendationsRepositoryInterface getRepository()
 */
class RecommendationsBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return RecoWriterInterface
     */
    public function createRecoWriter(): RecoWriterInterface
    {
        return new RecoWriter(
            $this->getQueryContainer()
        );
    }

    /**
     * @return ScenarioWriterInterface
     */
    public function createScenarioWriter(): ScenarioWriterInterface
    {
        return new ScenarioWriter(
            $this->getQueryContainer()
        );
    }

    /**
     * @return ScenarioReaderInterface
     */
    public function createScenarioReader(): ScenarioReaderInterface
    {
        return new ScenarioReader(
            $this->getQueryContainer(),
            $this->getRepository()
        );
    }

    /**
     * @return DefinitionReader
     */
    public function createDefinitionReader(): DefinitionReader
    {
        return new DefinitionReader(
            $this->getRepository()
        );
    }

    /**
     * @return DefinitionWriterInterface
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
