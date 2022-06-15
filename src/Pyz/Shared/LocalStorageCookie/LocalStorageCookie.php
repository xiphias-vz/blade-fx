<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\LocalStorageCookie;

use Pyz\Shared\Quote\QuoteConstants;

class LocalStorageCookie
{
    /**
     * @return void
     */
    public static function deleteCookieData()
    {
        setcookie(QuoteConstants::QUOTE_COOKIE_NAME, "", time() - 3600);
        unset($_COOKIE[QuoteConstants::QUOTE_COOKIE_NAME]);
    }
}
