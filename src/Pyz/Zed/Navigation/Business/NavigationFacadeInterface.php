<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business;

use Generated\Shared\Transfer\CategoryTransfer;
use Spryker\Zed\Navigation\Business\NavigationFacadeInterface as SprykerNavigationFacadeInterface;

/**
 * @method \Pyz\Zed\Navigation\Business\NavigationBusinessFactory getFactory()
 */
interface NavigationFacadeInterface extends SprykerNavigationFacadeInterface
{
    /**
     * @api
     *
     * @return int[]
     */
    public function getMainNavigationIds(): array;

    /**
     * @param \Generated\Shared\Transfer\CategoryTransfer $categoryTransfer
     *
     * @return void
     */
    public function updateFromCategoryTransfer(CategoryTransfer $categoryTransfer): void;
}
