<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Oauth;

use Spryker\Client\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Client\OauthCryptography\Communication\Plugin\Oauth\BearerTokenAuthorizationValidatorPlugin;
use Spryker\Client\OauthCryptography\Communication\Plugin\Oauth\FileSystemKeyLoaderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Client\OauthCryptography\Communication\Plugin\Oauth\FileSystemKeyLoaderPlugin[]
     */
    protected function getKeyLoaderPlugins(): array
    {
        return [
            new FileSystemKeyLoaderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\OauthCryptography\Communication\Plugin\Oauth\BearerTokenAuthorizationValidatorPlugin[]
     */
    protected function getAuthorizationValidatorPlugins(): array
    {
        return [
            new BearerTokenAuthorizationValidatorPlugin(),
        ];
    }
}
