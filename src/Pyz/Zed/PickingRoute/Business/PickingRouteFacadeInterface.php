<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Business;

interface PickingRouteFacadeInterface
{
    /**
     * Specification
     *
     * - creates a map between the skus and the picking order
     *
     * @api
     *
     * @param array $productAttributesGroupedBySku
     *
     * @return int[]
     */
    public function getSkuToProductPickingOrderMap(array $productAttributesGroupedBySku): array;
}
