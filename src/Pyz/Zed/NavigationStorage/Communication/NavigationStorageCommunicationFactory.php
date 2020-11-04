<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationStorage\Communication;

use Pyz\Zed\Navigation\Business\NavigationFacadeInterface;
use Spryker\Zed\NavigationStorage\Communication\NavigationStorageCommunicationFactory as SprykerNavigationStorageCommunicationFactory;
use Spryker\Zed\NavigationStorage\NavigationStorageDependencyProvider;

class NavigationStorageCommunicationFactory extends SprykerNavigationStorageCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Navigation\Business\NavigationFacadeInterface
     */
    public function getNavigationFacade(): NavigationFacadeInterface
    {
        return $this->getProvidedDependency(NavigationStorageDependencyProvider::FACADE_NAVIGATION);
    }
}
