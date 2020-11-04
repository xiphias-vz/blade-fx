<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Application\Url;

class SafeUrl
{
    /**
     * @param string $url
     *
     * @return bool
     */
    public static function isUrlSafe(string $url): bool
    {
        return $url === '/' || preg_match('~^(/[\w\-]+)+~', $url) === 1;
    }
}
