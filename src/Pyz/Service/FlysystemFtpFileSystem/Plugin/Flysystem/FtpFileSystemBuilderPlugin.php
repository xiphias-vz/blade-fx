<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemFtpFileSystem\Plugin\Flysystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Spryker\Service\FlysystemFtpFileSystem\Plugin\Flysystem\FtpFilesystemBuilderPlugin as SpryFtpFilesystemBuilderPlugin;

/**
 * @method \Pyz\Service\FlysystemFtpFileSystem\FlysystemFtpFileSystemServiceFactory getFactory()
 */
class FtpFileSystemBuilderPlugin extends SpryFtpFilesystemBuilderPlugin
{
    /**
     * @param string $type
     *
     * @return bool
     */
    public function acceptType($type): bool
    {
        return $type === static::class;
    }

    /**
     * @inheritDoc
     */
    public function build(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = [])
    {
        $configTransfer = new FlysystemConfigTransfer();

        return $this->getFactory()
        ->createFlysystemFtpFileSystemBuilder($configTransfer, $flysystemPluginCollection)
        ->build();
    }
}
