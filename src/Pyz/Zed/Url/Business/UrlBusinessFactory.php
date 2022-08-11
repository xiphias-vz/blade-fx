<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Url\Business;

use Pyz\Zed\Url\Business\Url\UrlReader;
use Pyz\Zed\Url\Business\Url\UrlUpdater;
use Spryker\Zed\Url\Business\UrlBusinessFactory as SprykerUrlBusinessFactory;

class UrlBusinessFactory extends SprykerUrlBusinessFactory
{
    /**
     * @return \Spryker\Zed\Url\Business\Url\UrlReaderInterface
     */
    public function createUrlReader()
    {
        return new UrlReader(
            $this->getQueryContainer(),
            $this->getRepository()
        );
    }

    /**
     * @return \Spryker\Zed\Url\Business\Url\UrlUpdaterInterface
     */
    public function createUrlUpdater()
    {
        $urlUpdater = new UrlUpdater($this->getQueryContainer(), $this->createUrlReader(), $this->createUrlActivator());

        $this->attachUrlUpdaterObservers($urlUpdater);

        return $urlUpdater;
    }
}
