<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Url\Business\Url;

use Generated\Shared\Transfer\UrlTransfer;
use Spryker\Zed\Url\Business\Exception\MissingUrlException;
use Spryker\Zed\Url\Business\Url\UrlUpdater as SprykerUrlUpdater;

class UrlUpdater extends SprykerUrlUpdater
{
    /**
     * @param \Generated\Shared\Transfer\UrlTransfer $urlTransfer
     *
     * @return \Generated\Shared\Transfer\UrlTransfer
     */
    protected function executeUpdateUrlTransaction(UrlTransfer $urlTransfer): UrlTransfer
    {
        $urlEntity = $this->getUrl($urlTransfer->getUrl());
        $originalUrlTransfer = new UrlTransfer();
        $originalUrlTransfer->fromArray($urlEntity->toArray(), true);

        $urlEntity->fromArray($urlTransfer->modifiedToArray());

        if ($this->isUrlEntityChanged($urlEntity)) {
            $this->assertUrlDoesNotExist($urlTransfer);
        }

        $this->notifyBeforeSaveObservers($urlTransfer, $originalUrlTransfer);

        $urlEntity->save();
        $this->urlActivator->activateUrl($urlTransfer);

        $this->notifyAfterSaveObservers($urlTransfer, $originalUrlTransfer);

        return $urlTransfer;
    }

    /**
     * @param string $url
     *
     * @throws \Spryker\Zed\Url\Business\Exception\MissingUrlException
     *
     * @return \Orm\Zed\Url\Persistence\SpyUrl
     */
    protected function getUrl($url)
    {
        $urlEntity = $this->urlQueryContainer->queryUrl($url)
            ->findOne();

        if (!$urlEntity) {
            throw new MissingUrlException(sprintf(
                'Tried to retrieve url with URL "%s", but it is missing',
                $url
            ));
        }

        return $urlEntity;
    }
}
