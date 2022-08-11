<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Business\Storage;

use Exception;
use Pyz\Zed\UrlStorage\Persistence\UrlStorageRepositoryInterface;
use Spryker\Zed\UrlStorage\Business\Storage\UrlStorageWriter as SprykerUrlStorageWriter;

class UrlStorageWriter extends SprykerUrlStorageWriter
{
    /**
     * @param int[] $urlIds
     *
     * @throws \Exception
     *
     * @return void
     */
    public function publish(array $urlIds)
    {
        $localeNames = $this->getSharedPersistenceLocaleNames();
        $urlEntityTransfers = $this->urlStorageRepository->findLocalizedUrlsByUrlIds($urlIds, $localeNames);
        $urlStorageTransfers = $this->mapUrlsEntitiesToUrlStorageTransfers($urlEntityTransfers);

        if ($this->urlStorageRepository instanceof UrlStorageRepositoryInterface) {
            $urlStorageEntities = $this->urlStorageRepository->findUrlStorageByUrls($this->getUrlArray($urlEntityTransfers));
        } else {
            throw new Exception('Var is not of type UrlStorageRepositoryInterface');
        }

        $this->storeData($urlStorageTransfers, $urlStorageEntities);
    }

    /**
     * @param array $urlEntityTransfers
     *
     * @return array
     */
    private function getUrlArray(array $urlEntityTransfers): array
    {
        $urlArray = [];
        foreach ($urlEntityTransfers as $item) {
            /** @var \Orm\Zed\Url\Persistence\SpyUrl $urlEntityTransfer */
            foreach ($item as $urlEntityTransfer) {
                $urlArray[] = $urlEntityTransfer->getUrl();
            }
        }

        return $urlArray;
    }

    /**
     * @param \Generated\Shared\Transfer\UrlStorageTransfer[] $urlStorageTransfers
     * @param \Orm\Zed\UrlStorage\Persistence\SpyUrlStorage[] $urlStorageEntities
     *
     * @return void
     */
    protected function storeData(array $urlStorageTransfers, array $urlStorageEntities)
    {
        foreach ($urlStorageTransfers as $urlStorageTransfer) {
            $urlStorageEntity = $urlStorageEntities[$urlStorageTransfer->getUrl()] ?? null;

            $this->storeDataSet($urlStorageTransfer, $urlStorageEntity);
        }
    }
}
