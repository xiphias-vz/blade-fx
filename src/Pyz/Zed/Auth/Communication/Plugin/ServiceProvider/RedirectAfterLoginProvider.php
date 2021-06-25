<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Auth\Communication\Plugin\ServiceProvider;

use Spryker\Zed\Auth\AuthConfig;
use Spryker\Zed\Auth\Communication\Plugin\EventDispatcher\RedirectAfterLoginEventDispatcherPlugin as SprykerRedirectAfterLoginProvider;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

/**
 * @method \Spryker\Zed\Auth\Communication\AuthCommunicationFactory getFactory()
 * @method \Spryker\Zed\Auth\Business\AuthFacadeInterface getFacade()
 * @method \Pyz\Zed\Auth\AuthConfig getConfig()
 * @method \Spryker\Zed\Auth\Persistence\AuthQueryContainerInterface getQueryContainer()
 */
class RedirectAfterLoginProvider extends SprykerRedirectAfterLoginProvider
{
    protected const HOST_REGEXP = '/(https?:\/\/)?((?:[\w-]+\.)+[\w]{2,})/';
    protected const URL_ERROR = '/error';

    /**
     * @param \Symfony\Component\HttpKernel\Event\ResponseEvent $event
     *
     * @return \Symfony\Component\HttpKernel\Event\ResponseEvent
     */
    protected function handleRedirectFromLogin(ResponseEvent $event): ResponseEvent
    {
        $request = $event->getRequest();

        if ($request->getPathInfo() !== AuthConfig::DEFAULT_URL_LOGIN) {
            return $event;
        }

        if (!$this->isAuthenticated($request)) {
            return $event;
        }

        $referer = $request->query->get(static::REFERER);

        if ($referer === null || $this->isRefererAllowed($referer) === false) {
            return $event;
        }

        $event->setResponse(new RedirectResponse($referer));

        return $event;
    }

    /**
     * Asserts that no external URL can be injected into the redirect URL.
     *
     * @param string $url
     *
     * @return bool
     */
    protected function isRefererAllowed(string $url): bool
    {
        if ($url[0] !== '/' || strpos($url, '//') === 0) {
            return false;
        }

        if ($url === static::URL_ERROR) {
            return false;
        }

        preg_match(static::HOST_REGEXP, $url, $matches);

        foreach ($matches as $match) {
            if ($match !== '') {
                return false;
            }
        }

        return true;
    }
}
