<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Persistence;

use Spryker\Zed\UrlStorage\Persistence\UrlStorageRepositoryInterface as SprykerUrlStorageRepositoryInterface;

interface UrlStorageRepositoryInterface extends SprykerUrlStorageRepositoryInterface
{
    /**
     * @param string[] $urls
     *
     * @return \Orm\Zed\UrlStorage\Persistence\SpyUrlStorage[]
     */
    public function findUrlStorageByUrls(array $urls): array;
}
