<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Plugin\Product;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface;

/**
 * @method \Pyz\Zed\ProductQuantityGui\Communication\ProductQuantityGuiCommunicationFactory getFactory()
 */
class SaveProductQuantityProductConcretePluginUpdatePlugin extends AbstractPlugin implements ProductConcretePluginUpdateInterface
{
    /**
     * Specification:
     * - Saves product quantity on product concrete save.
     *
     * @api
     *
     * @see \Spryker\Zed\Product\ProductDependencyProvider
     *
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    public function update(ProductConcreteTransfer $productConcreteTransfer)
    {
        $productQuantity = $productConcreteTransfer->getProductQuantity();

        if ($productQuantity !== null) {
            $this->getFactory()->getProductQuantityFacade()->saveProductQuantity($productQuantity);
        }

        return $productConcreteTransfer;
    }
}
