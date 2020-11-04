<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache\Business;

use Spryker\Zed\Cache\Business\CacheFacade as SprykerCacheFacade;

/**
 * @method \Pyz\Zed\Cache\Business\CacheBusinessFactory getFactory()
 * @method \Pyz\Zed\Cache\CacheConfig getConfig()
 */
class CacheFacade extends SprykerCacheFacade implements CacheFacadeInterface
{
    /**
     * @return string[]
     */
    public function emptyDirectoriesCache(): array
    {
        return $this->getFactory()
            ->createCacheClearer()
            ->emptyDirectoriesCache();
    }
}
