<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountrySearch;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;
use Spryker\Client\Kernel\Container as SprykerContainer;

class CountrySearchDependencyProvider extends AbstractDependencyProvider
{
    public const COUNTRY_STORAGE = 'CLIENT_STORAGE';

    public function provideServiceLayerDependencies(Container $container)
    {
        return parent::provideServiceLayerDependencies($container);
        $container = $this->addCountryStorageClient($container);

        return $container;
    }

    public function addCountryStorageClient(Container $container)
    {
        $container->set(static::COUNTRY_STORAGE, function (SprykerContainer $container) {
             return $container->getLocator()->country()->client();
        });
    }
}
