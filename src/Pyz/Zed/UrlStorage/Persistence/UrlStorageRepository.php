<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Persistence;

use Orm\Zed\UrlStorage\Persistence\Map\SpyUrlStorageTableMap;
use Spryker\Zed\UrlStorage\Persistence\UrlStorageRepository as SprykerUrlStorageRepository;

class UrlStorageRepository extends SprykerUrlStorageRepository implements UrlStorageRepositoryInterface
{
 /**
  * @param string[] $urls
  *
  * @return \Orm\Zed\UrlStorage\Persistence\SpyUrlStorage[]
  */
    public function findUrlStorageByUrls(array $urls): array
    {
        return $this->getFactory()
            ->createSpyStorageUrlQuery()
            ->filterByUrl_In($urls)
            ->find()
            ->toKeyIndex(SpyUrlStorageTableMap::getTableMap()->getColumn(SpyUrlStorageTableMap::COL_URL)->getPhpName());
    }
}
