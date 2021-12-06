<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\FactFinderGui\Plugin;

use Pyz\Yves\FactFinderGui\FactFinderGuiDependencyProvider;
use Spryker\Yves\Kernel\AbstractFactory;

class FactFinderGuiPluginFactory extends AbstractFactory
{
    /**
     * @return \SprykerEco\Client\FactFinderSdk\FactFinderSdkClient
     */
    public function getFactFinderClient()
    {
        return $this->getProvidedDependency(FactFinderGuiDependencyProvider::FACT_FINDER_SDK_CLIENT);
    }
}
