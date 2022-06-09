<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\LocalStorageCookie;

class LocalStorageCookie
{
    /**
     * @return void
     */
    public static function deleteCookieData()
    {
        setcookie("local_storage_cookie", "", time() - 3600);
    }
}
