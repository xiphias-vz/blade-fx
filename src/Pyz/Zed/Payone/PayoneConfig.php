<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone;

use Pyz\Shared\Payone\PayoneConstants;
use SprykerEco\Zed\Payone\PayoneConfig as SprykerEcoPayoneConfig;

class PayoneConfig extends SprykerEcoPayoneConfig
{
    /**
     * @return array
     */
    public function getAllStoresPayoneConfig(): array
    {
        return $this->get(PayoneConstants::PAYONE_ALL_STORES);
    }
}
