<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\PermissionAccess\Business;

use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use StoreApp\Zed\PermissionAccess\Business\Access\AccessValidator;

/**
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class PermissionAccessBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \StoreApp\Zed\PermissionAccess\Business\Access\AccessValidator
     */
    public function createAccessValidator(): AccessValidator
    {
        return new AccessValidator();
    }
}
