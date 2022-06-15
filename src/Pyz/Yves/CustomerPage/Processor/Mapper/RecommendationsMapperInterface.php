<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Processor\Mapper;

use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult;

interface RecommendationsMapperInterface
{
    /**
     * @param \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult $restApiResult
     * @param string $token
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function mapResultAndTokenToRecoTransfer(GlobusRestApiResult $restApiResult, string $token, RecoTransfer $recoTransfer): RecoTransfer;
}
