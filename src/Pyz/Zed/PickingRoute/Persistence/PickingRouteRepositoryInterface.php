<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Persistence;

interface PickingRouteRepositoryInterface
{
    /**
     * @param string[] $pickingOrderKeys
     *
     * @return int[]
     */
    public function findPickingOrderByPickingOrderKeys(array $pickingOrderKeys): array;
}
