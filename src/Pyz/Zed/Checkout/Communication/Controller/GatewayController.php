<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Communication\Controller;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Spryker\Shared\ErrorHandler\ErrorLogger;
use Spryker\Zed\Checkout\Communication\Controller\GatewayController as SprykerGatewayController;

class GatewayController extends SprykerGatewayController
{
    /**
     * @param \Exception|\Throwable $exception
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    protected function createCheckoutResponseWithPlaceOrderFailure($exception): CheckoutResponseTransfer
    {
        $checkoutResponseTransfer = (new CheckoutResponseTransfer())
            ->setIsSuccess(false);

        ErrorLogger::getInstance()->log($exception);

        return $checkoutResponseTransfer;
    }
}
