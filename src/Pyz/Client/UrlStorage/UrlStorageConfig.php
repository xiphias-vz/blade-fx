<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\UrlStorage;

use Spryker\Client\UrlStorage\UrlStorageConfig as SprykerUrlStorageConfig;

class UrlStorageConfig extends SprykerUrlStorageConfig
{
    /**
     * @api
     *
     * @return bool
     */
    public function allowTrailingSlashesInUrl(): bool
    {
        return true;
    }
}
