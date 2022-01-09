<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CurrentStoreCookieCheck;

use Pyz\Shared\Store\StoreConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class CurrentStoreCookieCheckConfig extends AbstractBundleConfig
{
    /**
     * @return array
     */
    public function getCurrentStoreSapId(): array
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
    }
}
