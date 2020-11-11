<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
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
