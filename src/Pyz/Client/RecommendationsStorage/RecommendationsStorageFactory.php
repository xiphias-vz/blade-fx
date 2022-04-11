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

class RecommendationsStorageFactory extends AbstractFactory
{
    /**
     * @return StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return RecommendationsStorageReaderInterface
     */
    public function createRecommendationsStorageReader(): RecommendationsStorageReaderInterface
    {
        return new RecommendationsStorageReader(
            $this->getStorageClient()
        );
    }
}
