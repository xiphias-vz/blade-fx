<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class RecoWriter implements RecoWriterInterface
{
    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $queryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $queryContainer)
    {
        $this->queryContainer = $queryContainer;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->queryContainer->insertRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->queryContainer->clearRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->queryContainer->getExistingRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        return $this->queryContainer->getActiveScenarioName($scenarioTransfer);
    }
}
