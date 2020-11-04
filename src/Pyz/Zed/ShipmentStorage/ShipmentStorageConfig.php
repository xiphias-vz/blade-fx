<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class ShipmentStorageConfig extends AbstractBundleConfig
{
    /**
     * @api
     *
     * @return string|null
     */
    public function getShipmentSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @api
     *
     * @return bool
     */
    public function isSendingToQueue(): bool
    {
        return true;
    }
}
