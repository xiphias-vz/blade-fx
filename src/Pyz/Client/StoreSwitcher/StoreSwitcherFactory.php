<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\StoreSwitcher;

use Pyz\Client\StoreSwitcher\Zed\StoreSwitcherStub;
use Spryker\Client\Kernel\AbstractFactory;

class StoreSwitcherFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\StoreSwitcher\Zed\StoreSwitcherStub
     */
    public function createZedStub(): StoreSwitcherStub
    {
        return new StoreSwitcherStub($this->getZedRequestClient());
    }

    /**
     * @return mixed
     */
    protected function getZedRequestClient()
    {
        return $this->getProvidedDependency(StoreSwitcherDependencyProvider::CLIENT_ZED_REQUEST);
    }
}
