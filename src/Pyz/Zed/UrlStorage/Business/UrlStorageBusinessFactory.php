<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Business;

use Pyz\Zed\UrlStorage\Business\Storage\UrlStorageWriter;
use Spryker\Zed\UrlStorage\Business\UrlStorageBusinessFactory as SprykerUrlStorageBusinessFactory;

/**
 * @method \Spryker\Zed\UrlStorage\UrlStorageConfig getConfig()
 * @method \Spryker\Zed\UrlStorage\Persistence\UrlStorageQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\UrlStorage\Persistence\UrlStorageRepositoryInterface getRepository()
 * @method \Spryker\Zed\UrlStorage\Persistence\UrlStorageEntityManagerInterface getEntityManager()
 */
class UrlStorageBusinessFactory extends SprykerUrlStorageBusinessFactory
{
    /**
     * @return \Spryker\Zed\UrlStorage\Business\Storage\UrlStorageWriterInterface
     */
    public function createUrlStorageWriter()
    {
        return new UrlStorageWriter(
            $this->getUtilSanitizeService(),
            $this->getRepository(),
            $this->getEntityManager(),
            $this->getStoreFacade(),
            $this->getConfig()->isSendingToQueue()
        );
    }
}
