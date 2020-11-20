<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Adapter;

use Generated\Shared\Transfer\FlysystemConfigSftpTransfer;
use League\Flysystem\AdapterInterface;
use League\Flysystem\Sftp\SftpAdapter;

class SftpAdapterBuilder implements AdapterBuilderInterface
{
    protected const HOST_KEY = 'host';
    protected const PORT_KEY = 'port';
    protected const USERNAME_KEY = 'username';
    protected const PASSWORD_KEY = 'password';
    protected const ROOT_KEY = 'root';

    /**
     * @var \Generated\Shared\Transfer\FlysystemConfigSftpTransfer
     */
    protected $adapterConfig;

    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigSftpTransfer $adapterConfig
     */
    public function __construct(FlysystemConfigSftpTransfer $adapterConfig)
    {
        $this->adapterConfig = $adapterConfig;
    }

    /**
     * @return \League\Flysystem\AdapterInterface
     */
    public function build(): AdapterInterface
    {
        return new SftpAdapter([
            static::HOST_KEY => $this->adapterConfig->getHost(),
            static::PORT_KEY => $this->adapterConfig->getPort(),
            static::USERNAME_KEY => $this->adapterConfig->getUsername(),
            static::PASSWORD_KEY => $this->adapterConfig->getPassword(),
            static::ROOT_KEY => $this->adapterConfig->getRoot(),
        ]);
    }
}
