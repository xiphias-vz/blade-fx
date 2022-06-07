<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sitemap;

use Pyz\Shared\Sitemap\SitemapConstants;
use Pyz\Shared\S3Constants\S3Constants;
use Spryker\Shared\Kernel\AbstractBundleConfig;

class SitemapConfig  extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getSitemapBaseUrl(): string
    {
        return $this->get(SitemapConstants::SITEMAP_BASE_URL);
    }

    /**
     * @return array
     */
    public function getS3Credentials(): array
    {
        return $this->get(S3Constants::S3_CONSTANTS);
    }
}


