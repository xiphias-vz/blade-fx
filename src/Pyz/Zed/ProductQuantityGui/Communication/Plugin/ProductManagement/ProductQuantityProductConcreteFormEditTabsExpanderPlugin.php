<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Plugin\ProductManagement;

use Generated\Shared\Transfer\TabsViewTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditTabsExpanderPluginInterface;

/**
 * @method \Pyz\Zed\ProductQuantityGui\Communication\ProductQuantityGuiCommunicationFactory getFactory()
 */
class ProductQuantityProductConcreteFormEditTabsExpanderPlugin extends AbstractPlugin implements ProductConcreteFormEditTabsExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands tabs for product concrete edit page with tab Product Quantity.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\TabsViewTransfer $tabsViewTransfer
     *
     * @return \Generated\Shared\Transfer\TabsViewTransfer
     */
    public function expand(TabsViewTransfer $tabsViewTransfer): TabsViewTransfer
    {
        return $this->getFactory()
            ->createProductQuantityConcreteProductTabCreator()
            ->expandProductConcreteWithProductQuantityTab($tabsViewTransfer);
    }
}
