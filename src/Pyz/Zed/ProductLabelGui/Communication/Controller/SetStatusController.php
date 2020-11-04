<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabelGui\Communication\Controller;

use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Spryker\Zed\ProductLabelGui\Communication\Controller\SetStatusController as SprykerSetStatusController;
use Symfony\Component\HttpFoundation\Request;

class SetStatusController extends SprykerSetStatusController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return string
     */
    protected function getRedirectUrl(Request $request)
    {
        $url = parent::getRedirectUrl($request);

        if (!SafeUrl::isUrlSafe($url)) {
            throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $url));
        }

        return $url;
    }
}
