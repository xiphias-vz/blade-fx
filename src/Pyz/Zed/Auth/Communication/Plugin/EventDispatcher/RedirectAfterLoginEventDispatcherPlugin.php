<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Auth\Communication\Plugin\EventDispatcher;

use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Auth\Communication\Plugin\EventDispatcher\RedirectAfterLoginEventDispatcherPlugin as SprykerRedirectAfterLoginEventDispatcherPlugin;

/**
 * @method \Spryker\Zed\Auth\Communication\AuthCommunicationFactory getFactory()
 * @method \Spryker\Zed\Auth\Business\AuthFacadeInterface getFacade()
 * @method \Spryker\Zed\Auth\AuthConfig getConfig()
 * @method \Spryker\Zed\Auth\Persistence\AuthQueryContainerInterface getQueryContainer()
 */
class RedirectAfterLoginEventDispatcherPlugin extends SprykerRedirectAfterLoginEventDispatcherPlugin
{
    /**
     * Asserts that no external URL can be injected into the redirect URL.
     *
     * @param string|null $url
     *
     * @return string|null
     */
    protected function filterReferer(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        if (!SafeUrl::isUrlSafe($url)) {
            return null;
        }

        return $url;
    }
}
