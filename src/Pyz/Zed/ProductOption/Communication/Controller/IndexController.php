<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOption\Communication\Controller;

use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Spryker\Zed\ProductOption\Communication\Controller\IndexController as SprykerIndexController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Zed\ProductOption\Communication\ProductOptionCommunicationFactory getFactory()
 * @method \Spryker\Zed\ProductOption\Persistence\ProductOptionQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\ProductOption\Business\ProductOptionFacadeInterface getFacade()
 * @method \Spryker\Zed\ProductOption\Persistence\ProductOptionRepositoryInterface getRepository()
 */
class IndexController extends SprykerIndexController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function toggleActiveAction(Request $request)
    {
        $redirectResponse = parent::toggleActiveAction($request);

        $redirectUrl = $redirectResponse->getTargetUrl();

        if (!SafeUrl::isUrlSafe($redirectUrl)) {
            throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $redirectUrl));
        }

        return $redirectResponse;
    }
}
