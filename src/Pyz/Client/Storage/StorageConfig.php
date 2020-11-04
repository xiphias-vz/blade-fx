<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Storage;

use Spryker\Client\Storage\StorageConfig as SprykerStorageConfig;

class StorageConfig extends SprykerStorageConfig
{
    /**
     * @return int
     */
    public function getStorageCacheIncrementalStrategyKeySizeLimit()
    {
        return 10000;
    }
}
