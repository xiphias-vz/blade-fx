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

    public const MODULE_PICKER = 'picker';
    public const MODULE_DELIVERY = 'delivery';
}
