<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopApplication;

use Pyz\Yves\CartPage\Plugin\Provider\CartServiceProvider;
use Pyz\Yves\GoogleTagManager\Plugin\Provider\GoogleTagManagerTwigServiceProvider;
use Pyz\Yves\Matomo\Plugin\Provider\MatomoServiceProvider;
use Spryker\Yves\Application\Plugin\ServiceProvider\KernelLogServiceProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;

class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders()
    {
        $this->application->register(new KernelLogServiceProvider());
        $this->application->register(new CartServiceProvider());
        $this->application->register(new MatomoServiceProvider());
        //$this->application->register(new GoogleTagManagerTwigServiceProvider());
    }
}
