<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Application\Communication;

use Spryker\Zed\Application\Communication\ZedBootstrap as SprykerZedBootstrap;
use Spryker\Zed\Kernel\Locator;

class StoreAppDriverBootstrap extends SprykerZedBootstrap
{
    public function __construct()
    {
        parent::__construct();

        // we need this to make locator init correctly.
        Locator::getInstance();
    }
}
