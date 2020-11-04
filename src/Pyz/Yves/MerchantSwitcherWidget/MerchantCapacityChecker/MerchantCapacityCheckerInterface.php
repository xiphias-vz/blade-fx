<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\MerchantCapacityChecker;

interface MerchantCapacityCheckerInterface
{
    /**
     * @return bool
     */
    public function hasMerchantCapacityForDelivery(): bool;
}
