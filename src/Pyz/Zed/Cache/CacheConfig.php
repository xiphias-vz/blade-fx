<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache;

use Spryker\Zed\Cache\CacheConfig as SprykerCacheConfig;

class CacheConfig extends SprykerCacheConfig
{
    /**
     * @return string[]
     */
    public function getDirectoriesToClean(): array
    {
        return [
            APPLICATION_ROOT_DIR . '/src/Generated/Shared/Kernel/cache',
            APPLICATION_ROOT_DIR . '/src/Generated/StoreApp/Twig/cache',
            APPLICATION_ROOT_DIR . '/src/Generated/Yves/Twig/cache',
            APPLICATION_ROOT_DIR . '/src/Generated/Zed/Twig/cache',
            APPLICATION_ROOT_DIR . '/src/Generated/Zed/Translator/cache',
        ];
    }
}
