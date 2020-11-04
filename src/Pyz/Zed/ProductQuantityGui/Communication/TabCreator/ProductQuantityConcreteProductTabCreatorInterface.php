<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\TabCreator;

use Generated\Shared\Transfer\TabsViewTransfer;

interface ProductQuantityConcreteProductTabCreatorInterface
{
    /**
     * @param \Generated\Shared\Transfer\TabsViewTransfer $tabsViewTransfer
     *
     * @return \Generated\Shared\Transfer\TabsViewTransfer
     */
    public function expandProductConcreteWithProductQuantityTab(TabsViewTransfer $tabsViewTransfer): TabsViewTransfer;
}
