<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Flysystem;

use Pyz\Service\Flysystem\Model\Writer;
use Spryker\Service\Flysystem\FlysystemServiceFactory as SprykerFlySystemServiceFactory;

class FlysystemServiceFactory extends SprykerFlySystemServiceFactory
{
    /**
     * @return \Pyz\Service\Flysystem\Model\Writer
     */
    public function createWriter()
    {
        return new Writer(
            $this->createFilesystemProvider()
        );
    }
}
