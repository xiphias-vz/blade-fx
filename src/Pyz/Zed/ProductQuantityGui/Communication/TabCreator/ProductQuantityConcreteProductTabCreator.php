<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\TabCreator;

use Generated\Shared\Transfer\TabItemTransfer;
use Generated\Shared\Transfer\TabsViewTransfer;

class ProductQuantityConcreteProductTabCreator implements ProductQuantityConcreteProductTabCreatorInterface
{
    public const TAB_PRODUCT_QUANTITY_NAME = 'product_quantity';
    public const TAB_PRODUCT_QUANTITY_TITLE = 'Product Restrictions';
    public const TAB_PRODUCT_QUANTITY_TEMPLATE = '@ProductQuantityGui/_partials/product-quantity-concrete-tab.twig';

    /**
     * @param \Generated\Shared\Transfer\TabsViewTransfer $tabsViewTransfer
     *
     * @return \Generated\Shared\Transfer\TabsViewTransfer
     */
    public function expandProductConcreteWithProductQuantityTab(TabsViewTransfer $tabsViewTransfer): TabsViewTransfer
    {
        $tabItemTransfer = new TabItemTransfer();
        $tabItemTransfer
            ->setName(static::TAB_PRODUCT_QUANTITY_NAME)
            ->setTitle(static::TAB_PRODUCT_QUANTITY_TITLE)
            ->setTemplate(static::TAB_PRODUCT_QUANTITY_TEMPLATE);

        $tabsViewTransfer
            ->addTab($tabItemTransfer);

        return $tabsViewTransfer;
    }
}
