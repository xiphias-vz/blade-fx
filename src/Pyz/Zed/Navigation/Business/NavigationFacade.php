<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business;

use Generated\Shared\Transfer\CategoryTransfer;
use Generated\Shared\Transfer\NavigationNodeTransfer;
use Spryker\Zed\Navigation\Business\NavigationFacade as SprykerNavigationFacade;

/**
 * @method \Pyz\Zed\Navigation\Business\NavigationBusinessFactory getFactory()
 */
class NavigationFacade extends SprykerNavigationFacade implements NavigationFacadeInterface
{
    /**
     * @return int[]
     */
    public function getMainNavigationIds(): array
    {
        return $this->getFactory()->createNavigationHelper()->getMainNavigationIds();
    }

    /**
     * @param string $navigationNodeKey
     *
     * @return \Generated\Shared\Transfer\NavigationNodeTransfer|null
     */
    public function findNavigationNodeByKey(string $navigationNodeKey): ?NavigationNodeTransfer
    {
        return $this->getFactory()->createNavigationNodeReader()->findNavigationNodeByKey($navigationNodeKey);
    }

    /**
     * @param \Generated\Shared\Transfer\CategoryTransfer $categoryTransfer
     *
     * @return void
     */
    public function updateFromCategoryTransfer(CategoryTransfer $categoryTransfer): void
    {
        $this->getFactory()
            ->createCategoryModel()
            ->updateFromCategoryTransfer($categoryTransfer);
    }
}
