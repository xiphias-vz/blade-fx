<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business\Navigation;

use Spryker\Zed\Navigation\Business\Navigation\NavigationReader as SprykerNavigationReader;

class NavigationReader extends SprykerNavigationReader
{
    /**
     * @param string[] $navigationKeys
     *
     * @return int[]
     */
    public function findNavigationIdsByKeys(array $navigationKeys): array
    {
        $navigationIds = [];
        $navigationEntities = $this->navigationQueryContainer
                ->queryNavigation()
                ->filterByKey_In($navigationKeys)
                ->find();

        foreach ($navigationEntities as $navigationEntity) {
            $navigationIds[] = $navigationEntity->getIdNavigation();
        }

        return $navigationIds;
    }
}
