<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Messenger;

use Spryker\Client\Kernel\Container;
use Spryker\Client\Messenger\MessengerDependencyProvider as SprykerMessengerDependencyProvider;
use Spryker\Yves\Kernel\Plugin\Pimple;

class MessengerDependencyProvider extends SprykerMessengerDependencyProvider
{
    public const FLASH_MESSENGER = 'FLASH_MESSENGER';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = parent::provideServiceLayerDependencies($container);
        $container = $this->addFlashMessenger($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addFlashMessenger(Container $container): Container
    {
        $container->set(static::FLASH_MESSENGER, function () {
            $pimplePlugin = new Pimple();
            $application = $pimplePlugin->getApplication();

            return $application['flash_messenger'];
        });

        return $container;
    }
}
