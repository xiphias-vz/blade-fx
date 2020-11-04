<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache\Business;

use Pyz\Zed\Cache\Business\Model\CacheClearer;
use Spryker\Zed\Cache\Business\CacheBusinessFactory as SprykerCacheBusinessFactory;

/**
 * @method \Pyz\Zed\Cache\CacheConfig getConfig()
 */
class CacheBusinessFactory extends SprykerCacheBusinessFactory
{
    /**
     * @return \Pyz\Zed\Cache\Business\Model\CacheClearerInterface
     */
    public function createCacheClearer()
    {
        return new CacheClearer(
            $this->getConfig(),
            $this->getFileSystem(),
            $this->getFinder()
        );
    }
}
