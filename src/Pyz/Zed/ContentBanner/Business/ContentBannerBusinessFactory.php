<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ContentBanner\Business;

use Pyz\Zed\ContentBanner\Business\Model\ContentBannerConstraintsProvider;
use Spryker\Zed\ContentBanner\Business\ContentBannerBusinessFactory as ExtendContentBannerBusinessFactory;
use Spryker\Zed\ContentBanner\Business\Model\ContentBannerConstraintsProviderInterface;

class ContentBannerBusinessFactory extends ExtendContentBannerBusinessFactory
{
    /**
     * @return \Spryker\Zed\ContentBanner\Business\Model\ContentBannerConstraintsProviderInterface
     */
    public function createContentBannerConstraintsProvider(): ContentBannerConstraintsProviderInterface
    {
        return new ContentBannerConstraintsProvider();
    }
}
