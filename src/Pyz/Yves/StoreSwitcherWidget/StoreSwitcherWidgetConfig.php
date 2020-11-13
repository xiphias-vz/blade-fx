<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget;

use Pyz\Shared\Store\StoreConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class StoreSwitcherWidgetConfig extends AbstractBundleConfig
{
    /**
     * @return array
     */
    public function getStoreNames()
    {
        return $this->get(StoreConstants::STORE_NAMES);
    }
}
