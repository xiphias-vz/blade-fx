<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Matomo;

use Pyz\Shared\Matomo\MatomoConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class MatomoConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getMatomoUrl(): string
    {
        return $this->get(MatomoConstants::MATOMO_URL);
    }

    /**
     * @return string
     */
    public function getMatomoIdSite(): string
    {
        return $this->get(MatomoConstants::MATOMO_IDSITE);
    }
}
