<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage;

use Pyz\Client\RecommendationsStorage\Reader\RecommendationsStorageReader;
use Pyz\Client\RecommendationsStorage\Reader\RecommendationsStorageReaderInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;

class RecommendationsStorageFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Pyz\Client\RecommendationsStorage\Reader\RecommendationsStorageReaderInterface
     */
    public function createRecommendationsStorageReader(): RecommendationsStorageReaderInterface
    {
        return new RecommendationsStorageReader(
            $this->getStorageClient(),
            $this->getStoreClient()
        );
    }
}
