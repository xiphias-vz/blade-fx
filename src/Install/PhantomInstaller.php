<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Install;

use PhantomInstaller\Installer;

class PhantomInstaller
{
    /**
     * @param mixed ...$args
     *
     * @return void
     */
    public static function installPhantomJS(...$args)
    {
        if (getenv('SPRYKER_IN_DOCKER') || !class_exists(Installer::class)) {
            return;
        }

        Installer::installPhantomJS(...$args);
    }
}
