<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
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
