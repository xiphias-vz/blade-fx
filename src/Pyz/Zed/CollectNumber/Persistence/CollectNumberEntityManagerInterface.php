<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Persistence;

interface CollectNumberEntityManagerInterface
{
    /**
     * @param int $idSalesOrder
     * @param string $collectNumber
     *
     * @return void
     */
    public function saveCollectNumberToSalesOrder(int $idSalesOrder, string $collectNumber): void;
}
