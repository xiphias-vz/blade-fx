<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Business\Mapper;

interface PickingRouteMapperInterface
{
    /**
     * @param string[][] $productAttributesGroupedBySku
     *
     * @return int[]
     */
    public function getSkuToPickingOrderMap(array $productAttributesGroupedBySku): array;
}
