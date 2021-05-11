<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StoreSwitcherWidget\Business;

use Pyz\Zed\StoreSwitcherWidget\Business\Reader\StoreSwitcherReader\StoreSwitcherReader;
use Pyz\Zed\StoreSwitcherWidget\Business\Reader\StoreSwitcherReader\StoreSwitcherReaderInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class StoreSwitcherWidgetBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\StoreSwitcherWidget\Business\Reader\StoreSwitcherReader\StoreSwitcherReaderInterface
     */
    public function createStoreSwitcherReader(): StoreSwitcherReaderInterface
    {
        return new StoreSwitcherReader();
    }
}
