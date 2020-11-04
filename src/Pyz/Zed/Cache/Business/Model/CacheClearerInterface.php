<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cache\Business\Model;

use Spryker\Zed\Cache\Business\Model\CacheClearerInterface as SprykerCacheClearerInterface;

interface CacheClearerInterface extends SprykerCacheClearerInterface
{
    /**
     * @return string[]
     */
    public function emptyDirectoriesCache(): array;
}
