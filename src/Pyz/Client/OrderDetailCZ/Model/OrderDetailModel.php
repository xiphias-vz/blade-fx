<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetailCZ\Model;

use Pyz\Client\OrderDetail\Model\OrderDetailModel as IntOrderDetailModel;

class OrderDetailModel extends IntOrderDetailModel
{
    /**
     * @param array $taxPayments
     * @param int $bottlePrice
     *
     * @return array
     */
    protected function addBottleTaxes(array $taxPayments, int $bottlePrice): array
    {
        $taxPayments = $this->aggregateSumByTax(
            $taxPayments,
            0,
            $bottlePrice
        );

        return $taxPayments;
    }
}
