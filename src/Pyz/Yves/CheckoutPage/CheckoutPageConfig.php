<?php


namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig as SprykerCheckoutPageConfig;


class CheckoutPageConfig extends SprykerCheckoutPageConfig
{
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 1;

    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 72;

    public function getCustomerPasswordMinLength(): int
    {
        return static::MIN_LENGTH_CUSTOMER_PASSWORD;
    }

    public function getCustomerPasswordMaxLength(): int
    {
        return static::MAX_LENGTH_CUSTOMER_PASSWORD;
    }
}
