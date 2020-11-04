<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Yves\ErrorPage;

use SprykerShop\Yves\ErrorPage\ErrorPageConfig as SprykerShopErrorPageConfig;

use Symfony\Component\HttpFoundation\Response;

class ErrorPageConfig extends SprykerShopErrorPageConfig
{
    /**
     * @return int[]
     */
    public function getValidSubRequestExceptionStatusCodes()
    {
        $validSubRequestExceptionStatusCodes = parent::getValidSubRequestExceptionStatusCodes();
        $newValidSubRequestExceptionStatusCodes = [
            Response::HTTP_SERVICE_UNAVAILABLE,
        ];

        return array_merge($validSubRequestExceptionStatusCodes, $newValidSubRequestExceptionStatusCodes);
    }
}
