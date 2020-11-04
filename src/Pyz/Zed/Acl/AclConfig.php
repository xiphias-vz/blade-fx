<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Acl;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @return array
     */
    public function getInstallerUsers()
    {
        return [
            'admin@spryker.com' => [
                'group' => AclConstants::ROOT_GROUP,
            ],
        ];
    }

    /**
     * @return array
     */
    public function getInstallerGroups()
    {
        $groups = parent::getInstallerGroups();
        $groups[] = [
            'name' => AclConstants::DELIVERY_GROUP,
        ];
        $groups[] = [
            'name' => AclConstants::PICKER_GROUP,
        ];

        return $groups;
    }

    /**
     * @return array
     */
    public function getInstallerRoles()
    {
        $roles = parent::getInstallerRoles();

        $roles[] = [
            'name' => AclConstants::DELIVERY_ROLE,
            'group' => AclConstants::DELIVERY_GROUP,
        ];
        $roles[] = [
            'name' => AclConstants::PICKER_ROLE,
            'group' => AclConstants::PICKER_GROUP,
        ];

        return $roles;
    }

    /**
     * @return array
     */
    public function getInstallerRules()
    {
        $rules = parent::getInstallerRules();

        $rules[] = [
            'bundle' => AclConstants::MODULE_DELIVERY,
            'controller' => AclConstants::VALIDATOR_WILDCARD,
            'action' => AclConstants::VALIDATOR_WILDCARD,
            'type' => AclConstants::ALLOW,
            'role' => AclConstants::DELIVERY_ROLE,
        ];
        $rules[] = [
            'bundle' => AclConstants::MODULE_PICKER,
            'controller' => AclConstants::VALIDATOR_WILDCARD,
            'action' => AclConstants::VALIDATOR_WILDCARD,
            'type' => AclConstants::ALLOW,
            'role' => AclConstants::PICKER_ROLE,
        ];
        $rules[] = [
            'bundle' => 'error',
            'controller' => AclConstants::VALIDATOR_WILDCARD,
            'action' => AclConstants::VALIDATOR_WILDCARD,
            'type' => AclConstants::ALLOW,
            'role' => AclConstants::PICKER_ROLE,
        ];
        $rules[] = [
            'bundle' => 'error',
            'controller' => AclConstants::VALIDATOR_WILDCARD,
            'action' => AclConstants::VALIDATOR_WILDCARD,
            'type' => AclConstants::ALLOW,
            'role' => AclConstants::DELIVERY_ROLE,
        ];

        return $rules;
    }
}
