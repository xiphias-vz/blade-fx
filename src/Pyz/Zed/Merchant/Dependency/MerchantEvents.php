<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Dependency;

use Spryker\Zed\Merchant\Dependency\MerchantEvents as SprykerMerchantEvents;

class MerchantEvents extends SprykerMerchantEvents
{
    /**
     * Specification
     * - This events will be used for spy_merchant publishing.
     *
     * @api
     */
    public const ENTITY_MERCHANT_DELIVERY_POSTAL_CODE_CREATE = 'Entity.pyz_merchant_delivery_postal_code.create';
}
