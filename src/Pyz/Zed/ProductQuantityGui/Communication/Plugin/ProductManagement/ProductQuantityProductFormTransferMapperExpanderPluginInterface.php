<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Plugin\ProductManagement;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductFormTransferMapperExpanderPluginInterface;

/**
 * @method \Pyz\Zed\ProductQuantityGui\Communication\ProductQuantityGuiCommunicationFactory getFactory()
 */
class ProductQuantityProductFormTransferMapperExpanderPluginInterface extends AbstractPlugin implements ProductFormTransferMapperExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands ProductConcreteTransfer with ProductQuantityTransfer data
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcrete
     * @param array $formData
     *
     * @return \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    public function map(ProductConcreteTransfer $productConcrete, array $formData): ProductConcreteTransfer
    {
        return $this->getFactory()
            ->createProductQuantityProductFormTransferMapperExpander()
            ->map($productConcrete, $formData);
    }
}
