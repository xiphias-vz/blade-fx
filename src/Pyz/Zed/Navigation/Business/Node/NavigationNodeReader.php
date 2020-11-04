<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business\Node;

use Generated\Shared\Transfer\NavigationNodeTransfer;
use Spryker\Zed\Navigation\Business\Node\NavigationNodeReader as SprykerNavigationNodeReader;

class NavigationNodeReader extends SprykerNavigationNodeReader
{
    /**
     * @param string $navigationNodeKey
     *
     * @return \Generated\Shared\Transfer\NavigationNodeTransfer|null
     */
    public function findNavigationNodeByKey(string $navigationNodeKey): ?NavigationNodeTransfer
    {
        $navigationNodeEntity = $this->navigationQueryContainer
            ->queryNavigationNode()
            ->filterByNodeKey($navigationNodeKey)
            ->findOne();

        if (!$navigationNodeEntity) {
            return null;
        }

        return $this->mapNavigationNodeEntityToTransfer($navigationNodeEntity);
    }
}
