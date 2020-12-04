<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Auth;

use Spryker\Zed\Auth\AuthConfig as SprykerAuthConfig;

class AuthConfig extends SprykerAuthConfig
{
    public const DEFAULT_URL_REDIRECT = '/';

    /**
     * Returns the list of controller uri fragments per module to be checked by `ControllerRestrictionEventDispatcherPlugin`.
     *
     * @return string[][]
     */
    public function getControllerRestrictionList(): array
    {
        return [
            'picker' => [
                'index',
                'collect-by-customer',
                'picking',
            ],
            'delivery' => [
                'index',
            ],
        ];
    }

    /**
     * @api
     *
     * @return string
     */
    public function getAccessDeniedUri(): string
    {
        return '/acl/index/denied';
    }
}
