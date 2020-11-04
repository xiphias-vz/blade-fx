<?php

namespace Pyz\Client\Checkout;

use Pyz\Client\OrderHistoryBoosting\OrderHistoryBoostingClient;
use Spryker\Client\Checkout\CheckoutFactory as SprykerCheckoutFactory;

class CheckoutFactory extends SprykerCheckoutFactory
{
    public function getOrderHistoryBoostingClient(): OrderHistoryBoostingClient
    {
        return $this->getProvidedDependency(CheckoutDependencyProvider::ORDER_HISTORY_BOOSTING_CLIENT);
    }
}
