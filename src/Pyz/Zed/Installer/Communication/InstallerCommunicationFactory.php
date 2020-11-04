<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Installer\Communication;

use Pyz\Zed\Installer\InstallerDependencyProvider;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Installer\Communication\InstallerCommunicationFactory as SprykerInstallerCommunicationFactory;

class InstallerCommunicationFactory extends SprykerInstallerCommunicationFactory
{
    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getStore(): Store
    {
        return $this->getProvidedDependency(InstallerDependencyProvider::STORE);
    }
}
