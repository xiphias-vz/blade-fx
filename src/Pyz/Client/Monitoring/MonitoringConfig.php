<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Monitoring;

use Spryker\Client\Kernel\AbstractBundleConfig;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;

class MonitoringConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getFactFinderChannel(): string
    {
        return $this->get(FactFinderNgConstants::FACT_FINDER_CHANNEL);
    }

    /**
     * @return string
     */
    public function getFactFinderUsername(): string
    {
        return $this->get(FactFinderNgConstants::FACT_FINDER_USERNAME);
    }

    /**
     * @return string
     */
    public function getFactFinderUrl(): string
    {
        return $this->get(FactFinderNgConstants::FACT_FINDER_URL);
    }

    /**
     * @return string
     */
    public function getFactFinderPassword(): string
    {
        return $this->get(FactFinderNgConstants::FACT_FINDER_PASSWORD);
    }
}
