<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache\Business\Model;

use Spryker\Zed\Cache\Business\Model\CacheClearer as SprykerCacheClearer;

class CacheClearer extends SprykerCacheClearer implements CacheClearerInterface
{
    /**
     * @var \Pyz\Zed\Cache\CacheConfig
     */
    protected $config;

    /**
     * @return string[]
     */
    public function emptyDirectoriesCache(): array
    {
        $emptiedDirectories = [];
        $directories = $this->config->getDirectoriesToClean();

        foreach ($directories as $directory) {
            if (!$this->fileSystem->exists($directory)) {
                continue;
            }

            $this->clearDirectory($directory);
            $emptiedDirectories[] = $directory;
        }

        return $emptiedDirectories;
    }
}
