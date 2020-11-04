<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business;

use Generated\Shared\Transfer\ProductQuantityResponseTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityFacade as SprykerProductQuantityFacade;

/**
 * @method \Pyz\Zed\ProductQuantity\Business\ProductQuantityBusinessFactory getFactory()
 * @method \Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\ProductQuantity\Persistence\ProductQuantityRepositoryInterface getRepository()
 */
class ProductQuantityFacade extends SprykerProductQuantityFacade implements ProductQuantityFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductQuantityResponseTransfer
     */
    public function saveProductQuantity(ProductQuantityTransfer $productQuantityTransfer): ProductQuantityResponseTransfer
    {
        return $this->getFactory()->createProductQuantityWriter()->saveProductQuantity($productQuantityTransfer);
    }
}
