<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Controller;

use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Spryker\Zed\MerchantGui\Communication\Controller\CreateMerchantController as SprykerCreateMerchantController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class CreateMerchantController extends SprykerCreateMerchantController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $response = parent::indexAction($request);

        if ($response instanceof RedirectResponse) {
            $redirectUrl = $response->getTargetUrl();

            if (!SafeUrl::isUrlSafe($redirectUrl)) {
                throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $redirectUrl));
            }
        }

        return $response;
    }
}
