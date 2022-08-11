<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Url\Business\Url;

use Generated\Shared\Transfer\UrlTransfer;
use InvalidArgumentException;
use Spryker\Zed\Url\Business\Url\UrlReader as SprykerUrlReader;

class UrlReader extends SprykerUrlReader
{
    /**
     * @param \Generated\Shared\Transfer\UrlTransfer $urlTransfer
     * @param bool $ignoreUrlRedirects
     *
     * @throws \InvalidArgumentException
     *
     * @return \Orm\Zed\Url\Persistence\SpyUrlQuery
     */
    protected function queryUrlEntity(UrlTransfer $urlTransfer, $ignoreUrlRedirects = false)
    {
        if ($urlTransfer->getUrl()) {
            $urlQuery = $this->queryUrlEntityByUrl($urlTransfer->getUrl(), true);
        } elseif ($urlTransfer->getIdUrl()) {
            $urlQuery = $this->queryUrlEntityById($urlTransfer->getIdUrl(), true);
        } else {
            throw new InvalidArgumentException(sprintf(
                'The provided UrlTransfer does not have any data to find URL entity: %s. Set "%s" or "%s" for the UrlTransfer.',
                json_encode($urlTransfer->toArray()),
                UrlTransfer::URL,
                UrlTransfer::ID_URL
            ));
        }

        return $urlQuery;
    }
}
