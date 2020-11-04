<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Security\Plugin\Application;

use Pyz\Yves\CustomerPage\Plugin\Provider\DefaultLogoutSuccessHandler;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Yves\Security\Plugin\Application\SecurityApplicationPlugin as SprykerShopSecurityApplicationPlugin;

/**
 * @method \Spryker\Yves\Security\SecurityFactory getFactory()
 * @method \Spryker\Yves\Security\SecurityConfig getConfig()()
 */
class SecurityApplicationPlugin extends SprykerShopSecurityApplicationPlugin
{
    protected const SERVICE_CSRF_TOKEN_MANAGER = 'form.csrf_provider';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function addAuthenticationLogoutHandlerPrototype(ContainerInterface $container): ContainerInterface
    {
        $container->set(
            static::SERVICE_SECURITY_AUTHENTICATION_LOGOUT_HANDLER_PROTO,
            $container->protect(function ($name, $options) use ($container) {
                return function () use ($options, $container) {
                    return new DefaultLogoutSuccessHandler(
                        $container->get(static::SERVICE_SECURITY_HTTP_UTILS),
                        $options['target_url'] ?? '/'
                    );
                };
            })
        );

        return $container;
    }
}
