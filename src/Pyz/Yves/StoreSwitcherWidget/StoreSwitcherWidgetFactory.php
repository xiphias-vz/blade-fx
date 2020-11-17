<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget;

use Pyz\Yves\StoreSwitcherWidget\StoreSwitcher\StoreSwitcher;
use Spryker\Yves\Kernel\AbstractFactory;

class StoreSwitcherWidgetFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getStore()
    {
        return $this->getProvidedDependency(StoreSwitcherWidgetDependencyProvider::STORE);
    }

    /**
     * @return \Pyz\Yves\StoreSwitcherWidget\StoreSwitcher\StoreSwitcher
     */
    public function getStoreSwitcher()
    {
        return new StoreSwitcher();
    }
}
