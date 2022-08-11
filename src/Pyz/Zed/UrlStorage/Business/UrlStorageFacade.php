<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Business;

use Spryker\Zed\UrlStorage\Business\UrlStorageFacade as SprykerUrlStorageFacade;

class UrlStorageFacade extends SprykerUrlStorageFacade
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param array $urlIds
     *
     * @return void
     */
    public function publishUrl(array $urlIds)
    {
        $this->getFactory()->createUrlStorageWriter()->publish($urlIds);
    }
}
