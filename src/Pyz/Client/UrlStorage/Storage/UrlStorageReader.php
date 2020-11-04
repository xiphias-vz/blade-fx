<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\UrlStorage\Storage;

use Pyz\Client\UrlStorage\UrlStorageConfig;
use Spryker\Client\UrlStorage\Dependency\Client\UrlStorageToStorageInterface;
use Spryker\Client\UrlStorage\Dependency\Service\UrlStorageToSynchronizationServiceInterface;
use Spryker\Client\UrlStorage\Storage\UrlStorageReader as SprykerStorageUrlStorageReader;

class UrlStorageReader extends SprykerStorageUrlStorageReader
{
    protected const SLASH = '/';
    /**
     * @var \Pyz\Client\UrlStorage\UrlStorageConfig
     */
    protected $urlStorageConfig;

    /**
     * @param \Spryker\Client\UrlStorage\Dependency\Client\UrlStorageToStorageInterface $storageClient
     * @param \Spryker\Client\UrlStorage\Dependency\Service\UrlStorageToSynchronizationServiceInterface $synchronizationService
     * @param \Pyz\Client\UrlStorage\UrlStorageConfig $urlStorageConfig
     * @param \Spryker\Client\UrlStorage\Dependency\Plugin\UrlStorageResourceMapperPluginInterface[] $resourceMapperPlugins
     */
    public function __construct(
        UrlStorageToStorageInterface $storageClient,
        UrlStorageToSynchronizationServiceInterface $synchronizationService,
        UrlStorageConfig $urlStorageConfig,
        array $resourceMapperPlugins
    ) {
        parent::__construct($storageClient, $synchronizationService, $resourceMapperPlugins);

        $this->urlStorageConfig = $urlStorageConfig;
    }

    /**
     * @param string $url
     *
     * @return array
     */
    protected function getUrlFromStorage($url)
    {
        $urlStorageData = $this->getUrlStorageData($url);
        if (!$urlStorageData && $this->urlStorageConfig->allowTrailingSlashesInUrl()) {
            $url = $this->addTrailingSlashToUrl($url);
            $urlStorageData = $this->getUrlStorageData($url);
        }

        return $urlStorageData;
    }

    /**
     * @param string $url
     *
     * @return array|null
     */
    protected function getUrlStorageData(string $url): ?array
    {
        $urlKey = $this->getUrlKey($url);

        return $this->storageClient->get($urlKey);
    }

    /**
     * @param string $url
     *
     * @return string
     */
    protected function addTrailingSlashToUrl(string $url): string
    {
        return rtrim($url, static::SLASH) . static::SLASH;
    }
}
