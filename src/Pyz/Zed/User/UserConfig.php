<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserConfig as SprykerUserConfig;

class UserConfig extends SprykerUserConfig
{
    protected const LENGTH_PICKER_PASSWORD = 6;

    /**
     * @return array
     */
    public function getInstallerUsers()
    {
        return [
            [
                'firstName' => 'Admin',
                'lastName' => 'Spryker',
                'username' => 'admin@spryker.com',
                'password' => 'Change1234',
                'localeName' => 'de_DE',
            ],
            [
                'firstName' => 'Admin-CZ',
                'lastName' => 'Spryker',
                'username' => 'admin-cz@spryker.com',
                'password' => 'Change1234',
                'localeName' => 'cs_CZ',
            ],
        ];
    }

    /**
     * @api
     *
     * @return int
     */
    public function getPickerPasswordLength(): int
    {
        return static::LENGTH_PICKER_PASSWORD;
    }
}
