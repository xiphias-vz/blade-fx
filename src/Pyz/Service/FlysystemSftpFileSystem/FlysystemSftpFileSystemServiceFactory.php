<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Filesystem\SftpFilesystemBuilder;
use Spryker\Service\Kernel\AbstractServiceFactory;

/**
 * @method \Pyz\Service\FlysystemSftpFileSystem\FlysystemSftpFileSystemConfig getConfig()
 */
class FlysystemSftpFileSystemServiceFactory extends AbstractServiceFactory
{
    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     * @param \League\Flysystem\PluginInterface[] $flysystemPluginCollection
     *
     * @return \Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Filesystem\SftpFilesystemBuilder
     */
    public function createFlysystemSftpFileSystemBuilder(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = [])
    {
        return new SftpFilesystemBuilder($configTransfer);
    }
}
