<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\StoreSwitcher;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

class StoreSwitcher
{
    public const COOKIE_STORE_IDENTIFIER = 'current_store';

    /**
     * @param string $store
     * @param \Symfony\Component\HttpFoundation\Response $response
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function switchStore(string $store, Response $response)
    {
        $response->headers->setCookie(new Cookie(static::COOKIE_STORE_IDENTIFIER, $store));

        return $response;
    }
}
