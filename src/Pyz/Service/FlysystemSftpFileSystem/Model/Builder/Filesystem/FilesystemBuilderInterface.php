<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Filesystem;

use League\Flysystem\Filesystem;

interface FilesystemBuilderInterface
{
    /**
     * @return \League\Flysystem\Filesystem
     */
    public function build(): Filesystem;
}
