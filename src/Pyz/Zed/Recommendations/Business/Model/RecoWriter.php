<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class RecoWriter implements RecoWriterInterface
{
    /**
     * @var RecommendationsQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @param RecommendationsQueryContainerInterface $queryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $queryContainer)
    {
        $this->queryContainer = $queryContainer;
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoData(RecoTransfer $recoTransfer):RecoTransfer
    {
        return $this->queryContainer->insertRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->queryContainer->clearRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->queryContainer->getExistingRecoData($recoTransfer);
    }
}
