<?php

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
