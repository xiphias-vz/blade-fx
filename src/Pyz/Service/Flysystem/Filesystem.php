<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Flysystem;

use League\Flysystem\Filesystem as SprykeFilesystem;
use League\Flysystem\Util;

class Filesystem extends SprykeFilesystem
{
    /**
     * @inheritDoc
     */
    public function write($path, $contents, array $config = [])
    {
        $path = Util::normalizePath($path);
        $config = $this->prepareConfig($config);

        return (bool)$this->getAdapter()->write($path, $contents, $config);
    }

    /**
     * @inheritDoc
     */
    public function update($path, $contents, array $config = [])
    {
        $path = Util::normalizePath($path);
        $config = $this->prepareConfig($config);

        return (bool)$this->getAdapter()->update($path, $contents, $config);
    }
}
