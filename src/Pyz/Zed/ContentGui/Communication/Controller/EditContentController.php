<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ContentGui\Communication\Controller;

use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\ContentGui\Communication\Controller\EditContentController as SprykerEditContentController;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Symfony\Component\HttpFoundation\RedirectResponse;

class EditContentController extends SprykerEditContentController
{
    /**
     * @param string $url
     * @param int $status
     * @param array $headers
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function redirectResponse($url, $status = 302, $headers = [])
    {
        if (!SafeUrl::isUrlSafe($url[0])) {
            throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $url));
        }

        return new RedirectResponse($url, $status, $headers);
    }
}
