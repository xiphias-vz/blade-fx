<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem\Plugin\Flysystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Spryker\Service\Flysystem\Dependency\Plugin\FlysystemFilesystemBuilderPluginInterface;
use Spryker\Service\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Service\FlysystemSftpFileSystem\FlysystemSftpFileSystemServiceFactory getFactory()
 */
class SftpFileSystemBuilderPlugin extends AbstractPlugin implements FlysystemFilesystemBuilderPluginInterface
{
    /**
     * @param string $type
     *
     * @return bool
     */
    public function acceptType($type)
    {
        return $type === static::class;
    }

    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     * @param \League\Flysystem\PluginInterface[] $flysystemPluginCollection
     *
     * @return \League\Flysystem\Filesystem
     */
    public function build(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = [])
    {
        return $this->getFactory()
            ->createFlysystemSftpFileSystemBuilder($configTransfer, $flysystemPluginCollection)
            ->build();
    }
}
