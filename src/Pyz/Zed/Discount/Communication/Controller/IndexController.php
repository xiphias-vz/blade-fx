<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Discount\Communication\Controller;

use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Discount\Communication\Controller\IndexController as SprykerIndexController;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Symfony\Component\HttpFoundation\Request;

class IndexController extends SprykerIndexController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function toggleDiscountVisibilityAction(Request $request)
    {
        $redirectResponse = parent::toggleDiscountVisibilityAction($request);

        $redirectUrl = $redirectResponse->getTargetUrl();

        if (!SafeUrl::isUrlSafe($redirectUrl)) {
            throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $redirectUrl));
        }

        return $redirectResponse;
    }
}
