<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\UrlStorage;

use Pyz\Client\UrlStorage\Storage\UrlStorageReader;
use Spryker\Client\UrlStorage\UrlStorageFactory as SprykerUrlStorageFactory;

/**
 * @method \Pyz\Client\UrlStorage\UrlStorageConfig getConfig()
 */
class UrlStorageFactory extends SprykerUrlStorageFactory
{
    /**
     * @return \Spryker\Client\UrlStorage\Storage\UrlStorageReaderInterface
     */
    public function createUrlStorageReader()
    {
        return new UrlStorageReader(
            $this->getStorageClient(),
            $this->getSynchronizationService(),
            $this->getConfig(),
            $this->getUrlStorageResourceMapperPlugins()
        );
    }
}
