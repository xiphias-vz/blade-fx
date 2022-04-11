<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Controller;

use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method RecommendationsFacadeInterface getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @param RecoTransfer|null $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoDataAction(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFacade()
            ->insertRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function clearRecoDataAction(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFacade()
            ->clearRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFacade()
            ->getExistingRecoData($recoTransfer);
    }
}
