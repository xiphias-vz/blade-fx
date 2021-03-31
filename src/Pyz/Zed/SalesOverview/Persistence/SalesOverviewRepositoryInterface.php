<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Persistence;

interface SalesOverviewRepositoryInterface
{
    /**
     * @param int $choice "1 => 'Order', 2 => 'Position', 3 => 'Stückzahl'"
     * @param string $deliveryDate
     * @param string $merchantReference
     *
     * @return array
     */
    public function getDataByChoiceFilter(int $choice, string $deliveryDate, string $merchantReference): array;
}
