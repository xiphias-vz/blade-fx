<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\FactFinderWebComponents;

use Spryker\Yves\Kernel\AbstractBundleConfig;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;

class FactFinderWebComponentsConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getFFChannelName(): string
    {
        return $this->get(FactFinderNgConstants::FACT_FINDER_CHANNEL);
    }
}
