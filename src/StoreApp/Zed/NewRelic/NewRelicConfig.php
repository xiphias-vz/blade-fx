<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\NewRelic;

use Spryker\Zed\Kernel\AbstractBundleConfig;
use StoreApp\Shared\NewRelic\NewRelicConstants;

class NewRelicConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getNewRelicEnvironment(): string
    {
        return $this->get(NewRelicConstants::NEW_RELIC_ENVIRONMENT);
    }
}
