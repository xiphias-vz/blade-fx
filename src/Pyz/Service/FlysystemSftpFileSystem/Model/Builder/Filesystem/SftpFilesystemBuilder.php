<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Filesystem;

use Generated\Shared\Transfer\FlysystemConfigSftpTransfer;
use Generated\Shared\Transfer\FlysystemConfigTransfer;
use League\Flysystem\Filesystem;
use Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Adapter\AdapterBuilderInterface;
use Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Adapter\SftpAdapterBuilder;

class SftpFilesystemBuilder
{
    /**
     * @var \Generated\Shared\Transfer\FlysystemConfigTransfer
     */
    protected $config;

    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     */
    public function __construct(FlysystemConfigTransfer $configTransfer)
    {
        $this->config = $configTransfer;
    }

    /**
     * @return \League\Flysystem\Filesystem
     */
    public function build(): Filesystem
    {
        $this->assertAdapterConfig();

        $adapter = $this->createAdapterBuilder()->build();
        $config = $this->config->getFlysystemConfig() ?: [];

        return new Filesystem($adapter, $config);
    }

    /**
     * @return \Generated\Shared\Transfer\FlysystemConfigSftpTransfer
     */
    protected function buildAdapterConfig(): FlysystemConfigSftpTransfer
    {
        $configTransfer = new FlysystemConfigSftpTransfer();
        $configTransfer->fromArray($this->config->getAdapterConfig(), true);

        return $configTransfer;
    }

    /**
     * @return void
     */
    protected function assertAdapterConfig(): void
    {
        $adapterConfigTransfer = $this->buildAdapterConfig();
        $adapterConfigTransfer->requireHost();
        $adapterConfigTransfer->requirePassword();
        $adapterConfigTransfer->requirePort();
        $adapterConfigTransfer->requireUsername();
    }

    /**
     * @return \Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Adapter\AdapterBuilderInterface
     */
    protected function createAdapterBuilder(): AdapterBuilderInterface
    {
        $adapterConfigTransfer = $this->buildAdapterConfig();

        return new SftpAdapterBuilder($adapterConfigTransfer);
    }
}
