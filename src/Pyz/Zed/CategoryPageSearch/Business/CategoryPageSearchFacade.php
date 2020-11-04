<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Business;

use Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchFacade as SprykerCategoryPageSearchFacade;

/**
 * @method \Pyz\Zed\CategoryPageSearch\Business\CategoryPageSearchBusinessFactory getFactory()
 */
class CategoryPageSearchFacade extends SprykerCategoryPageSearchFacade
{
    /**
     * @param int $productAbstractId
     *
     * @return void
     */
    public function publishForProductAbstract(int $productAbstractId)
    {
        $this->getFactory()->createCategoryNodeSearch()->publishForProductAbstract($productAbstractId);
    }
}
