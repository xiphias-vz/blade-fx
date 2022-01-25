<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Acl;

use Spryker\Shared\Acl\AclConstants as SprykerAclConstants;

interface AclConstants extends SprykerAclConstants
{
    public const DELIVERY_GROUP = 'delivery_group';
    public const DELIVERY_ROLE = 'delivery_role';
    public const PICKER_GROUP = 'picker_group';
    public const PICKER_ROLE = 'picker_role';
    public const SUPERVISOR_ROLE = 'supervisor_role';
    public const SUPERVISOR_GROUP = 'supervisor_group';
    public const SUPPORT_CENTER_GROUP = 'support_center_group';
    public const SUPPORT_CENTER_ROLE = 'support_center_role';

    public const MODULE_PICKER = 'picker';
    public const MODULE_DELIVERY = 'delivery';
    public const MODULE_SALES = 'sales';
    public const MODULE_PRODUCT_MANAGEMENT = 'product-management';
    public const MODULE_PRICE_PRODUCT_SCHEDULE_GUI = 'price-product-schedule-gui';
    public const MODULE_SALES_OVERVIEW = 'sales-overview';
    public const MODULE_OMS = 'oms';
    public const MODULE_CUSTOMER = 'customer';
    public const MODULE_PICKING_ZONE_ORDER_EXPORT = 'picking-zone-order-export';
    public const MODULE_USER = 'user';
}
