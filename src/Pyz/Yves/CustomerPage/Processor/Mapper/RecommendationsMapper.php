<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Processor\Mapper;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult;

class RecommendationsMapper implements RecommendationsMapperInterface
{
    /**
     * @param GlobusRestApiResult $restApiResult
     * @param string $token
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function mapResultAndTokenToRecoTransfer(GlobusRestApiResult $restApiResult, string $token, RecoTransfer $recoTransfer): RecoTransfer
    {
        $recoTransfer->setApiResult($restApiResult->result);
        $recoTransfer->setToken($token);

        return $recoTransfer;
    }
}
