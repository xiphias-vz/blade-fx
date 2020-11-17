<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Checkout;

use Pyz\Client\OrderHistoryBoosting\OrderHistoryBoostingClient;
use Spryker\Client\Checkout\CheckoutFactory as SprykerCheckoutFactory;

class CheckoutFactory extends SprykerCheckoutFactory
{
    /**
     * @return \Pyz\Client\OrderHistoryBoosting\OrderHistoryBoostingClient
     */
    public function getOrderHistoryBoostingClient(): OrderHistoryBoostingClient
    {
        return $this->getProvidedDependency(CheckoutDependencyProvider::ORDER_HISTORY_BOOSTING_CLIENT);
    }
}
