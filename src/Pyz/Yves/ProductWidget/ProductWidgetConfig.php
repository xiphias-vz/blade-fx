<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductWidget;

use Pyz\Shared\Sales\SalesConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class ProductWidgetConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getDepositPrice(): int
    {
        return (int)$this->get(SalesConstants::BOTTLE_DEPOSIT_PRICE_IN_CENTS, 0);
    }
}
