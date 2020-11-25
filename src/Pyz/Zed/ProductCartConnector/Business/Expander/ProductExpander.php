<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\Expander;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductConcreteTransfer;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpander as SprykerProductExpander;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpanderInterface;

class ProductExpander extends SprykerProductExpander implements ProductExpanderInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return void
     */
    protected function expandItemWithProductConcrete(ProductConcreteTransfer $productConcreteTransfer, ItemTransfer $itemTransfer)
    {
        parent::expandItemWithProductConcrete($productConcreteTransfer, $itemTransfer);

        $pickZone = '';

        if (isset($productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE])) {
            $pickZone = $productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE];
        }

        if (isset($productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)])) {
            $pickZone = $productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)];
        }

        $weightPerUnit = $this->calculateWeightPerItem($productConcreteTransfer->getAttributes());

        $itemTransfer
            ->setPickZone($pickZone)
            ->setWeightPerUnit($weightPerUnit)
            ->setPricePerKg($productConcreteTransfer->getAttributes()[ProductConfig::PRICE_PER_KG] ?? null)
            ->setProductNumber($productConcreteTransfer->getProductNumber())
            ->setSapWgr($productConcreteTransfer->getAttributes()[ProductConfig::KEY_SAP_WGR] ?? '')
            ->setBonText($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BON_TEXT] ?? '');
    }

    /**
     * @param array $attributes
     *
     * @return int|null
     */
    protected function calculateWeightPerItem(array $attributes): ?int
    {
        if (!isset($attributes[ProductConfig::KEY_WEIGHT_PER_ITEM])) {
            return null;
        }

        return $attributes[ProductConfig::KEY_WEIGHT_PER_ITEM] * 1000;
    }
}
