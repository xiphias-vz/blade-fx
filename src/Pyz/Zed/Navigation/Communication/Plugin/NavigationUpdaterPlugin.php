<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Communication\Plugin;

use Generated\Shared\Transfer\CategoryTransfer;
use Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryUpdateAfterPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\Navigation\Business\NavigationFacadeInterface getFacade()
 */
class NavigationUpdaterPlugin extends AbstractPlugin implements CategoryUpdateAfterPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CategoryTransfer $categoryTransfer
     *
     * @return void
     */
    public function execute(CategoryTransfer $categoryTransfer): void
    {
        $this->getFacade()->updateFromCategoryTransfer($categoryTransfer);
    }
}
