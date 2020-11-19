<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemSftpFileSystem\Model\Builder\Adapter;

use League\Flysystem\AdapterInterface;

interface AdapterBuilderInterface
{
    /**
     * @return \League\Flysystem\AdapterInterface
     */
    public function build(): AdapterInterface;
}
